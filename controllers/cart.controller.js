import express from "express";
const router = express.Router();
import db from "../models/index.js";
import constants from "../constants/constants.js";

async function notifyUser(userId, existingRequest) {
  let foundCart = await db.cart.findOne({ userId: userId });
  console.log("foundCart: ", foundCart);
  if (
    foundCart &&
    !existingRequest &&
    foundCart.status === constants.abandonedStatus &&
    foundCart.notificationCount < constants.attempts
  ) {
    setTimeout(async function () {
      let recheckCart = await db.cart.findOne({ userId: userId });

      if (recheckCart.status === constants.abandonedStatus) {
        console.log("Time to notify...");
        recheckCart.notificationCount++;
        await recheckCart.save();
        if (recheckCart.notificationCount < constants.attempts) {
          notifyUser(userId);
        }
      }
    }, constants.intervals[foundCart.notificationCount]); // send notification after specific time
  } else if (
    foundCart &&
    existingRequest &&
    foundCart.status === constants.abandonedStatus &&
    foundCart.notificationCount == constants.attempts
  ) {
    foundCart.notificationCount = constants.startCount;
    await foundCart.save();
    notifyUser(userId);
  }
}

router.post("/abandoned", async (req, res) => {
  try {
    console.log("abandoned called... req.body: ", req.body);
    let foundCart = await db.cart.findOne({ userId: req.body.userId });
    console.log("FoundCart: ", foundCart);
    if (foundCart) {
      notifyUser(req.body.userId, true);
      res.status(200).send(foundCart);
    } else {
      const data = {
        userId: req.body.userId,
        status: constants.abandonedStatus,
        notificationCount: constants.startCount,
      };
      const cartItem = new db.cart(data);
      const savedItem = await cartItem.save();
      res.status(200).send(savedItem);
      notifyUser(data.userId);
    }
  } catch (err) {
    res.status(500).send(err);
  }
});
export default router;
