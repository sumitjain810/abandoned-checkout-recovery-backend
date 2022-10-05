import express from "express";
const router = express.Router();
import db from "../models/index.js";
import constants from "../constants/constants.js";

async function notifyUser(userId, newRequest) {
  let foundCart = await db.cart.findOne({ userId: userId });
  console.log("foundCart: ", foundCart);
  if (
    foundCart &&
    !newRequest &&
    foundCart.status === constants.abandonedStatus &&
    foundCart.notificationCount < constants.attempts
  ) {
    setTimeout(function () {
      console.log("Time to notify...");
      foundCart.notificationCount++;
      foundCart.save();
      notifyUser(userId);
    }, constants.intervals[foundCart.notificationCount]); // send notification after specific time
  } else if (
    foundCart &&
    newRequest &&
    foundCart.status === constants.abandonedStatus &&
    foundCart.notificationCount == 3
  ) {
    foundCart.notificationCount = 0;
    await foundCart.save();
    notifyUser(userId);
  }
  return foundCart;
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
