import BaseQueryParametersDto from '../base-query-paramers.dto';

export default class FindUsersQueryDto extends BaseQueryParametersDto {
  name: string;

  email: string;

  status: boolean;

  role: string;
}
