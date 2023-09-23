module.exports = {
  // Client will be the bot that you will use for the main purpose of the website and commands.
  client: {
    id: "", // Bot ID
    token: "", // Bot token
    secret: "", // Bot secret
    prefix: "", // Bot prefix
    owners: [ "" ], // Bot owner(s) ID, can be multiple owners separated by comma
    ownerUsernames: [ "@USERNAME" ], // Username of the owners of the website
  },

  database: {
    url: "", // Mongo url (eg. mongodb+srv://<username>:<password>@<host>/<database>)
  },

  website: {
    port: 5000, // The port that the website will be on (default: 5000)
    // Localhost Example:
    // url: 'http://localhost:5000', // default url
    // callback: 'http://localhost:5000/callback', // default callback url

    // Footer send a message
    email: "", // email address
    kofi: "", // Ko-fi donation link
    support: "", // discord support server
    twitter: "", // Twitter name

    name: "", // Website name
    theme: "HEX_COLOR", // Website theme color
    description: "", // Website description
    keywords: [ "" ].join(","), // Website keywords
    url: "http://localhost:5000", // default url
    callback: "http://localhost:5000/callback", // default callback url

    botTags: [
      "Fun",
      "Web-Dashboard",
      "Moderation",
      "Auto-Moderation",
      "Anime",
      "Logging",
      "Role-Management",
      "Leveling",
      "Media",
      "Premium-Features",
      "Music",
      "Crypto",
      "Multipurpose",
      "Administration",
      "Reaction-Roles",
      "Customizable-Prefix",
      "Guard",
      "Verification",
      "General",
      "Free",
      "Server-Management",
      "Ticketing",
      "Simple",
      "Multiple-Language-Support",
      "Community",
      "Stream",
      "Twitch",
      "Youtube",
      "Kick",
      "Instagram",
      "Twitter",
      "Welcomer",
      "Spotify",
      "Information",
      "Giveaway",
      "Games",
      "Media",
      "Easy-to-Use",
      "OSU!",
      "Gaming",
      "Open-Source",
    ],
  },

  server: {
    id: "", // Server ID
    emojis: {
      approve: "✅",
      decline: "⛔",
      success: "✅",
      error: "❌",
    },

    // Channel IDs
    channels: {
      errors: "", // Sends errors to this channel
      login: "", // Sends login logs to this channel (member login)
      botlogs: "", // Bot Add, Remove, Approve, Deny, Edit
      votes: "", // Bot votes channel
      schedules: "", // New schedule logs channel when you want to schedule a promotion
      voiceChannelStatistics: "", // Voice channel statistics channel "Website Visitors: 1365"

      // Mongo Logs
      datalogs: "", // Channel ID to store database changes
    },

    // Role IDs
    roles: {
      administrator: "", // Bot administrator role
      moderator: "", // Bot moderator role
      supporter: "", // Bot supporter role
      botReviewer: "", // Bot reviewer role
      botDeveloper: "", // Bot developer role
      verifiedBot: "", // Verified bot role
    },
  },

  languages: [
    {
      flag: "dk",
      code: "da",
      name: "Danish",
    },
    {
      flag: "gb",
      code: "en",
      name: "English",
    },
    {
      flag: "ae",
      code: "ar-EG",
      name: "Arabic",
    },
    {
      flag: "be",
      code: "bg",
      name: "Belgium",
    },
    {
      flag: "ro",
      code: "ro",
      name: "Romanian",
    },
    {
      flag: "jp",
      code: "ja",
      name: "Japan",
    },
    {
      flag: "gr",
      code: "el",
      name: "Greek",
    },
    {
      flag: "tr",
      code: "tr",
      name: "Türkçe",
    },
    {
      flag: "de",
      code: "de",
      name: "Deutsch",
    },
    {
      flag: "ru",
      code: "ru",
      name: "Russian",
    },
    {
      flag: "fr",
      code: "fr",
      name: "French",
    },
    {
      flag: "es",
      code: "es",
      name: "Spanish",
    },
  ],
};
