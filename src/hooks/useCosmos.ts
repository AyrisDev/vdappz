import {
  BalanceResponse,
  StakingInfoResponse,
  ValidatorResponse,
} from './cosmosTypes';

export type ValidatorsResponse = {
  values: ValidatorResponse[];
};

export const getAllValidators = async () => {
  const res = await fetch(
    `http://154.53.47.14:1317/cosmos/staking/v1beta1/validators`
  );
  return res.json() as Promise<ValidatorsResponse>;
};
