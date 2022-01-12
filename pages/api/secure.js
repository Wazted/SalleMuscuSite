// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import moment from "moment";

var timestampWait = {};
const master = new String("wazted master");

export default function handler(req, res) {
  if (req.method === 'POST') {
    if (timestampWait.key) {
      if (timestampWait.key.localeCompare(req.body.key) === 0 || master.localeCompare(req.body.key) === 0) {
        timestampWait = {};
        res.status(200).json({message: "correctly removed"});
      } else {
        res.status(400).json({message: "cheh"});
      }
    } else {
      const date = moment().toDate();
      const timer = req.body.timestamp || 1;
      timestampWait = {"key": new String(req.body.key), "timestamp": moment(date).add(timer, 'm').toDate()};
      res.status(200).json({time: timestampWait.timestamp});
    }
  } else if (req.method === "GET") {
    // Handle any other HTTP method
    const date = moment().toDate();
    const diffDate = moment(timestampWait.timestamp).diff(moment(date), "second")
    if (timestampWait.key && diffDate > 0) {
      res.status(200).json({value: diffDate});
    } else {
      res.status(400).json({message: "error"});
    }
  } else {
    // Handle any other HTTP method
    res.status(400);
  }
}
