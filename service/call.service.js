import { CallRepository } from "../repository/call.repository.js";

class CallService {
  constructor() {
    this.repository = new CallRepository();
  }
  //create a new CallService
  createCall = async (data) => {
    try {
      const body = {
        'name': data.name,
        'status': callStatus.ringing,
        'to': data.to,
        'from': data.from,
        'duration': 0,
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
  }

  //update call duration
  updateCallDuration = async (callId, duration) => {
    try {
      return await this.repository.updateCallDuration({callId, duration});
    } catch (error) {
      throw error;
    }
  }

  //get all incomming calls
  getAllIncomingCalls = async () => {
    try {
      return await this.repository.getAllIncommingCalls();
    } catch (error) {
      throw error;
    }
  }
  //get onCallStatus
  getOnCallStatus = async (userId) => {
    try {
      return await this.repository.getOnCallStatus(userId);
    } catch (error) {
      throw error;
    }
  }
  //get all outgoing calls
  getAllOutgoingCalls = async () => {
    try {
      return await this.repository.getAllOutgoingCalls();
    } catch (error) {
      throw error;
    }
  }
  //get call by id
  getCallById = async (callId) => {
    try {
      return await this.repository.getCallById(callId);
    } catch (error) {
      throw error;
    }
  }


}
export default CallService
