import CallModel from "../model/call.model.js";
import { callStatus } from "../utils/call_status.js";

class CallRepository {
  //create a new CallRepository
  createCall = async (data) => {
    try {
      const res = CallModel.create(data);
      return res.then((data) => {
        return data._id;
      });
    } catch (error) {
      console.log(error);
      throw "Error creating CallRepository";
    }
  };
  //update call status
  updateCallStatus = async (data) => {
    try {
      const res = await CallModel.findByIdAndUpdate(
        data.roomId,
        { status: data.status },
        { new: true }
      );
      return res;
    } catch (error) {
      console.log(error);
      throw "Error updating CallRepository";
    }
  };

  //update call duration
  updateCallDuration = async (data) => {
    try {
      const res = await CallModel.findByIdAndUpdate(
        data.CallId,
        { duration: data.duration },
        { new: true }
      );
      return res;
    } catch (error) {
      console.log(error);
      throw "Error updating CallRepository";
    }
  };

  //get call by id
  getCallById = async (id) => {
    try {
      const res = await CallModel.findById(id);
      return res;
    } catch (error) {
      console.log(error);
      throw "Error getting CallRepository";
    }
  };
  //get all calls by user
  getAllIncommingCalls = async (userId) => {
    try {
      const res = await CallModel.find({ to: userId });
      return res;
    } catch (error) {
      console.log(error);
      throw "Error getting all calls by user";
    }
  };
  //get all out going calls
  getAllOutgoingCalls = async (userId) => {
    try {
      const res = await CallModel.find({ from: userId });
      return res;
    } catch (error) {
      console.log(error);
      throw "Error getting all outgoing calls by user";
    }
  };
  //get on call status
  getOnCallStatus = async (userId) => {
    try {
      const res = await CallModel.findOne({
        to: userId,
        status: callStatus.ON_CALL,
      });
      return res;
    } catch (error) {
      console.log(error);
      throw "Error getting on call status";
    }
  };
}
export { CallRepository };
