(async () => {
    const botVotes = await global.botVotes.find();

    for (const voted of botVotes) {
        let timeLeft = 10800000 - (Date.now() - voted.Date);
        if (timeLeft > 0) {
            setTimeout(async () => {
                await global.botVotes.deleteOne({ userID: voted.userID, botID: voted.botID });
            }, timeLeft);
        } else {
            await global.botVotes.deleteOne({ userID: voted.userID, botID: voted.botID });
        }
    }
})();