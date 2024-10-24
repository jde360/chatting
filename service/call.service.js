import { CallRepository } from "../repository/call.repository.js";
import { callStatus } from "../utils/call_status.js";

class CallService {
  constructor() {
    this.repository = new CallRepository();
  }
  //create a new CallService
  createCall = async (data) => {
    try {
      const body = {
        name: data.name,
        status: callStatus.INIT,
        to: data.to,
        // 'from': data.from,
        from: "6710f9da2c4b56960d56477f",
        durations: 0,
        sdp: data.sdp,
      };
      return await this.repository.createCall(body);
    } catch (error) {
      throw error;
    }
  };
  //update call status
  updateCallStatus = async (data) => {
    try {
      return await this.repository.updateCallStatus(data);
    } catch (error) {
      throw error;
    }
  };

  //update call duration
  updateCallDuration = async (callId, duration) => {
    try {
      return await this.repository.updateCallDuration({ callId, duration });
    } catch (error) {
      throw error;
    }
  };

  //get all incomming calls
  getAllIncomingCalls = async () => {
    try {
      return await this.repository.getAllIncommingCalls();
    } catch (error) {
      throw error;
    }
  };
  //get onCallStatus
  getOnCallStatus = async (userId) => {
    try {
      return await this.repository.getOnCallStatus(userId);
    } catch (error) {
      throw error;
    }
  };
  //get all outgoing calls
  getAllOutgoingCalls = async () => {
    try {
      return await this.repository.getAllOutgoingCalls();
    } catch (error) {
      throw error;
    }
  };
  //get call by id
  getCallById = async (callId) => {
    try {
      return await this.repository.getCallById(callId);
    } catch (error) {
      throw error;
    }
  };
}
export default CallService;
