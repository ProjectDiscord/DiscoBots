const app = require("express").Router();

console.success("[Bots] /bots/search.js router loaded.".brightYellow);

const botsdata = require("../../database/models/bots/bots.js");

app.get("/bots/:tag", async (req, res) => {
  let tags = {};
  let totalBots = await botsdata.find({});
  let total_tags = config.website.botTags;
  for (let bot of totalBots.filter((b) => b.status === "Approved"))
    for (let tag of bot.tags) tags[tag] = (tags[tag] || 0) + 1;
  let tag_count = [];
  for (let tag of total_tags) {
    if (tags[tag]) {
      tag_count.push({
        tag: tag,
        count: tags[tag],
      });
    } else {
      tag_count.push({
        tag: tag,
        count: 0,
      });
    }
  }

  let page = req.query.page || 1;
  let bots = await botsdata.find({ tags: req.params.tag });
  if (page < 1) return res.redirect("/bots/" + req.params.tag);
  if (page > Math.ceil(bots.length / 10))
    return res.redirect("/bots/" + req.params.tag);
  if (Math.ceil(bots.length / 10) == 0) page = 1;

  res.render("bots/search", {
    bot: global.client ? global.client : null,
    path: req.path,
    user: req.isAuthenticated() ? req.user : null,
    req: req,
    page: page,
    bots: bots,
    tag: req.params.tag,
    tags: tag_count,
  });
});

app.get("/bots", async (req, res) => {
  let tags = {};
  let totalBots = await botsdata.find({});
  let total_tags = config.website.botTags;
  for (let bot of totalBots.filter((b) => b.status === "Approved"))
    for (let tag of bot.tags) tags[tag] = (tags[tag] || 0) + 1;
  let tag_count = [];
  for (let tag of total_tags) {
    if (tags[tag]) {
      tag_count.push({
        tag: tag,
        count: tags[tag],
      });
    } else {
      tag_count.push({
        tag: tag,
        count: 0,
      });
    }
  }

  let page = req.query.page || 1;
  let bots = await botsdata.find({});
  if (page < 1) return res.redirect("/bots");
  if (page > Math.ceil(bots.length / 10)) return res.redirect("/bots");
  if (Math.ceil(bots.length / 10) == 0) page = 1;

  res.render("bots/total_bots", {
    bot: global.client ? global.client : null,
    path: req.path,
    user: req.isAuthenticated() ? req.user : null,
    req: req,
    page: page,
    bots: bots,
    tags: tag_count,
  });
});

const rlimit = eRatelimit({
  windowMs: 30 * 1000,
  max: 1,
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res, next, options) => {
    error(
      res,
      "You have reached your rate limit! Please try again in a few seconds."
    );
  },
});

app.post("/bots/find/:bot", rlimit, async (req, res) => {
  try {
    let { bot } = req.params;
    if (!bot) return error(res, "Please provide a botID or a bot name.");
    if (bot.length < 3)
      return error(
        res,
        "Bot name or ID must be at least <strong>3</strong> characters long."
      );

    let foundBots = (await botsdata.find()).filter(
      (b) =>
        b.username.toLowerCase().indexOf(bot.toLowerCase()) > -1 ||
        (b.botID == bot && b.status == "Approved")
    );
    if (!foundBots) {
      return error(
        res,
        "Sorry but we couldn't find any bot with that name or ID."
      );
    }

    foundBots = await Promise.all(
      foundBots.map(async (b) => {
        if (b.status == "Approved") {
          return {
            botID: b.botID,
            avatar:
              (await global.client.users.fetch(b.botID)).displayAvatarURL({
                dynamic: true,
              }) ?? "https://cdn.discordapp.com/embed/avatars/0.png",
            username: b.username,
            shortDesc: b.shortDesc,
            votes: b.votes.toLocaleString(),
          };
        }
      })
    ).catch(() => null);

    res.json({
      error: false,
      bots: await Promise.all(foundBots),
    });
  } catch (e) {
    concole.log(e.stack);
    return res.json({
      error: true,
      message:
        "it seems like an error has occured, please try again later. (The administrators have been notified).",
    });
  }
});

module.exports = app;
