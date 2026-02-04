
{-# LANGUAGE DataKinds #-}
{-# LANGUAGE NoImplicitPrelude #-}
{-# LANGUAGE TemplateHaskell #-}

module Savings where

import PlutusTx
import PlutusTx.Prelude

data SavingsDatum = SavingsDatum
  { target :: Integer
  , saved  :: Integer
  }

{-# INLINABLE validateSave #-}
validateSave :: SavingsDatum -> Integer -> Bool
validateSave datum amount =
  traceIfFalse "Target already reached" (saved datum < target datum) &&
  traceIfFalse "Invalid amount" (amount > 0)

PlutusTx.compile [|| validateSave ||]
