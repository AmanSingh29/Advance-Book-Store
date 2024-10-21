function getFilterByPriceStage(matchStage, min_price, max_price) {
  if (min_price && max_price) {
    matchStage.price = { $lte: +max_price, $gte: +min_price };
  } else if (min_price) {
    matchStage.price = { $gte: +min_price };
  } else {
    matchStage.price = { $lte: +max_price };
  }
}

function getFilterByDate(matchStage, start_date, end_date) {
  if (min_price && max_price) {
    matchStage.publish_date = { $lte: start_date, $gte: end_date };
  } else if (min_price) {
    matchStage.publish_date = { $gte: start_date };
  } else {
    matchStage.publish_date = { $lte: end_date };
  }
}

module.exports = {
  getFilterByPriceStage,
  getFilterByDate,
};
