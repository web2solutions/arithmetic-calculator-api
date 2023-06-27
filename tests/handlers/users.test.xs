import {
  findOne, find, create, update, deleteOne,
} from '../src/users_handler';

/** import { jsonStringify } from '@src/utils/helpers';
import { ChangeRequestService } from '@src/services/ChangeControl/ChangeRequestService';
import { CreatedChangeRequestResult } from '@src/services/ChangeControl/types';
import { ChangeRequest } from '@src/services/ChangeControl/Model/ChangeRequest';
import { createChangeRequestPayloadBody, validChangeRequestFields } from '@tests/mocks/change-request.mock'; */

describe('handler to the create change request', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });
  it('should properly call the createChangeRequest', async () => {
    expect.hasAssertions();

    const requestPayload = {
      body: JSON.stringify(createChangeRequestPayloadBody),
    };

    const changeRequest = ChangeRequest.fromFields(validChangeRequestFields);
    const result: CreatedChangeRequestResult = {
      approvalRequiredChangeRequest: changeRequest,
      approvalNotRequiredChangeRequest: changeRequest,
    };

    const mockedService = jest.spyOn(ChangeRequestService.prototype, 'createChangeRequest').mockResolvedValue(result);
    const response = await handler(requestPayload, {}, null);
    expect(mockedService).toHaveBeenCalledTimes(1);
    expect(response.statusCode).toStrictEqual(200);
    expect(response.body)
      .toStrictEqual(jsonStringify({
        data: {
          type: 'ChangeRequest',
          attributes: {
            approvalNotRequired: {
              uuid: '1759d656-b128-47b1-83ad-30336bc0ec7c',
              entityType: 'merchant',
              entityId: 'entityId',
              requiresRiskApproval: false,
              changes: [
                {
                  changeType: 'BUSINESS_INFORMATION',
                  attributeLabel: 'attribute',
                  jsonPath: 'json',
                  currentValue: 'current',
                  proposedValue: 'new',
                },
              ],
              status: 'CHANGE_REQUEST_MANUAL_REVIEW',
              createdAt: 123435,
              updatedAt: 123455,
            },
            approvalRequired: {
              uuid: '1759d656-b128-47b1-83ad-30336bc0ec7c',
              entityType: 'merchant',
              entityId: 'entityId',
              requiresRiskApproval: false,
              changes: [
                {
                  changeType: 'BUSINESS_INFORMATION',
                  attributeLabel: 'attribute',
                  jsonPath: 'json',
                  currentValue: 'current',
                  proposedValue: 'new',
                },
              ],
              status: 'CHANGE_REQUEST_MANUAL_REVIEW',
              createdAt: 123435,
              updatedAt: 123455,
            },
          },
        },
      }));
  });
});
