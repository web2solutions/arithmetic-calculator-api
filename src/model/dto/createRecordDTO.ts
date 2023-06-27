/* eslint-disable camelcase */
export interface CreateRecordDTO {
  _id?: string,
  user_id: string,
  operation_id: string,
  amount: number,
  user_balance: number,
  user_input_numbers: number[],
  operation_response: string,
  date?: Date,
}
