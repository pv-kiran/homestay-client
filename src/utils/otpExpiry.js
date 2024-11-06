const getOtpExpiryInSeconds = (expiry) => {
  const givenDate = new Date(expiry);
  const currentDate = new Date();
  const timeDiffMs = givenDate.getTime() - currentDate.getTime();
  const timeDiffSeconds = Math.floor(timeDiffMs / 1000);
  return timeDiffSeconds;
};

export default getOtpExpiryInSeconds;
