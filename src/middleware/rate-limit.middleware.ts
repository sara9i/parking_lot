import { Request, Response, NextFunction } from "express";
import * as GLOBAL from '../globals';
import moment from 'moment';
const WINDOW_SIZE_IN_SECONDS = 10;
const MAX_WINDOW_REQUEST_COUNT = 10;
const WINDOW_LOG_INTERVAL_IN_SECONDS = 1;

export const rateLimit = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try{
    const currentRequestTime = moment();
    if(Object.keys(GLOBAL.rate_limit_map).length === 0 || GLOBAL.rate_limit_map[request.ip] == null){
            let newRecord : string[] = [];
            let requestLog: any = {
              requestTimeStamp: currentRequestTime.unix(),
              requestCount: 1
            };
            newRecord.push(requestLog);
            GLOBAL.rate_limit_map[request.ip] = JSON.stringify(newRecord);
            return next();
    }
    // if record is found, parse it's value and calculate number of requests users has made within the last window
    let data = JSON.parse(GLOBAL.rate_limit_map[request.ip]);
    let windowStartTimestamp = moment()
      .subtract(WINDOW_SIZE_IN_SECONDS, 'seconds')
      .unix();
    let requestsWithinWindow = data.filter(entry => {
      return entry.requestTimeStamp > windowStartTimestamp;
    });
    // console.log('requestsWithinWindow', requestsWithinWindow);
    let totalWindowRequestsCount = requestsWithinWindow.reduce((accumulator, entry) => {
      return accumulator + entry.requestCount;
    }, 0);
    // if number of requests made is greater than or equal to the desired maximum, return error
    if (totalWindowRequestsCount >= MAX_WINDOW_REQUEST_COUNT) {
      return response.status(429)
        .json(
          `You have exceeded the ${MAX_WINDOW_REQUEST_COUNT} requests in ${WINDOW_SIZE_IN_SECONDS} seconds limit!`
        );
    } else {
      // if number of requests made is less than allowed maximum, log new entry
      let lastRequestLog = data[data.length - 1];
      let potentialCurrentWindowIntervalStartTimeStamp = currentRequestTime
        .subtract(WINDOW_LOG_INTERVAL_IN_SECONDS, 'seconds')
        .unix();
      //  if interval has not passed since last request log, increment counter
      if (lastRequestLog.requestTimeStamp > potentialCurrentWindowIntervalStartTimeStamp) {
        lastRequestLog.requestCount++;
        data[data.length - 1] = lastRequestLog;
      } else {
        //  if interval has passed, log new entry for current user and timestamp
        data.push({
          requestTimeStamp: currentRequestTime.unix(),
          requestCount: 1
        });
      }
      GLOBAL.rate_limit_map[request.ip] = JSON.stringify(data);
      next();
    }
  }catch(err){
    console.log("ERROR FROM MIDDLEWARE!!");
    console.log(err);
    return response.status(500).json(err);
  }
};