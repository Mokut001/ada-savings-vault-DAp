{-# LANGUAGE DataKinds #-}
{-# LANGUAGE NoImplicitPrelude #-}
{-# LANGUAGE TemplateHaskell #-}
{-# LANGUAGE ScopedTypeVariables #-}

module SavingsGoal where

import Plutus.V2.Ledger.Api
import PlutusTx
import PlutusTx.Prelude hiding (Semigroup(..))

{-# INLINABLE mkValidator #-}
mkValidator :: PubKeyHash -> () -> () -> ScriptContext -> Bool
mkValidator owner _ _ ctx =
    traceIfFalse "Not signed by owner" signedByOwner
  where
    info = scriptContextTxInfo ctx
    signedByOwner = txSignedBy info owner

validator :: PubKeyHash -> Validator
validator pkh = mkValidatorScript $
    $$(PlutusTx.compile [|| \o -> mkValidator o ||])
    `PlutusTx.applyCode` PlutusTx.liftCode pkh

valHash :: PubKeyHash -> ValidatorHash
valHash = validatorHash . validator

scriptAddress :: PubKeyHash -> Address
scriptAddress = scriptHashAddress . valHash
