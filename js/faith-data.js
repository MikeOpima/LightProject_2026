/* Questions About Faith — content.
   Verse text: World English Bible (public domain).
   Shape mirrors js/data.js: window.FAITH = { VERSES, GIST, CATEGORIES } */

window.FAITH = (function () {

  /* Full verse text, keyed by reference exactly as written in CATEGORIES[].steps[].refs */
  var VERSES = {
    "Matthew 28:17": "When they saw him, they bowed down to him, but some doubted.",
    "Mark 9:24": "Immediately the father of the child cried out with tears, “I believe. Help my unbelief!”",
    "Romans 1:20": "For the invisible things of him since the creation of the world are clearly seen, being perceived through the things that are made, even his everlasting power and divinity, that they may be without excuse.",
    "Hebrews 13:5": "He has said, “I will in no way leave you, neither will I in any way forsake you.”",
    "James 4:8": "Draw near to God, and he will draw near to you. Cleanse your hands, you sinners; and purify your hearts, you double-minded.",
    "Mark 12:30": "You shall love the Lord your God with all your heart, and with all your soul, and with all your mind, and with all your strength.",
    "1 Peter 3:15": "Sanctify the Lord God in your hearts, and always be ready to give an answer to everyone who asks you a reason concerning the hope that is in you, with humility and fear.",
    "Psalm 13:1-2": "How long, Yahweh? Will you forget me forever? How long will you hide your face from me? How long shall I take counsel in my soul, having sorrow in my heart every day?",
    "Psalm 13:5-6": "But I trust in your loving kindness. My heart rejoices in your salvation. I will sing to Yahweh, because he has been good to me.",
    "Isaiah 53:3": "He was despised, and rejected by men; a man of suffering, and acquainted with disease. He was despised as one from whom men hide their face, and we didn't respect him.",
    "John 11:35": "Jesus wept.",
    "Matthew 5:45": "...that you may be children of your Father who is in heaven. For he makes his sun to rise on the evil and the good, and sends rain on the just and the unjust.",
    "Luke 13:2-3": "Do you think that these Galileans were worse sinners than all the other Galileans, because they suffered such things? I tell you, no, but, unless you repent, you will all perish in the same way.",
    "James 1:13": "Let no man say when he is tempted, “I am tempted by God,” for God can't be tempted by evil, and he himself tempts no one.",
    "Genesis 50:20": "As for you, you meant evil against me, but God meant it for good, to bring to pass, as it is this day, to save many people alive.",
    "Psalm 34:18": "Yahweh is near to those who have a broken heart, and saves those who have a crushed spirit.",
    "Revelation 21:3-4": "Behold, God's dwelling is with people, and he will dwell with them, and they will be his people. He will wipe away every tear from their eyes. Death will be no more; neither will there be mourning, nor crying, nor pain, any more. The first things have passed away.",
    "2 Peter 1:20-21": "Knowing this first, that no prophecy of Scripture is of private interpretation. For no prophecy ever came by the will of man, but holy men of God spoke, being moved by the Holy Spirit.",
    "2 Timothy 3:16": "Every writing is God-breathed and profitable for teaching, for reproof, for correction, and for instruction in righteousness.",
    "Isaiah 40:8": "The grass withers, the flower fades; but the word of our God stands forever.",
    "1 Corinthians 15:14": "And if Christ has not been raised, then our preaching is in vain, and your faith also is in vain.",
    "1 Corinthians 15:3-4": "For I delivered to you first of all that which I also received: that Christ died for our sins according to the Scriptures, that he was buried, that he was raised on the third day according to the Scriptures,",
    "Matthew 10:28": "Don't be afraid of those who kill the body, but are not able to kill the soul. Rather, fear him who is able to destroy both soul and body.",
    "2 Peter 3:9": "The Lord is not slow concerning his promise, as some count slowness, but is patient with us, not wishing that any should perish, but that all should come to repentance.",
    "Revelation 3:20": "Behold, I stand at the door and knock. If anyone hears my voice and opens the door, then I will come in to him, and will dine with him, and he with me.",
    "Romans 2:14-15": "For when Gentiles who don't have the law do by nature the things of the law, these, not having the law, are a law to themselves, in that they show the work of the law written in their hearts, their conscience testifying with them.",
    "Genesis 18:25": "...Shouldn't the Judge of all the earth do right?",
    "Romans 3:23": "For all have sinned, and fall short of the glory of God;",
    "Ephesians 2:8-9": "For by grace you have been saved through faith, and that not of yourselves; it is the gift of God, not of works, that no one would boast.",
    "1 Corinthians 8:5-6": "For though there are things that are called “gods,” whether in the heavens or on earth, yet to us there is one God, the Father, of whom are all things, and we for him; and one Lord, Jesus Christ, through whom are all things, and we live through him.",
    "John 14:6": "I am the way, the truth, and the life. No one comes to the Father, except through me.",
    "Proverbs 14:12": "There is a way which seems right to a man, but in the end it leads to death.",
    "Titus 3:5": "Not by works of righteousness which we did ourselves, but according to his mercy, he saved us, through the washing of regeneration and renewing by the Holy Spirit.",
    "1 John 5:13": "These things I have written to you who believe in the name of the Son of God, that you may know that you have eternal life.",
    "1 John 1:9": "If we confess our sins, he is faithful and righteous to forgive us the sins, and to cleanse us from all unrighteousness.",
    "Matthew 6:9": "Pray like this: “Our Father in heaven, may your name be kept holy.”",
    "2 Peter 3:18": "But grow in the grace and knowledge of our Lord and Savior Jesus Christ. To him be the glory both now and forever. Amen.",
    "Matthew 7:7": "Ask, and it will be given you. Seek, and you will find. Knock, and it will be opened for you."
  };

  /* One-line gist for cross-references / search snippets */
  var GIST = {
    "Matthew 28:17": "Even his followers had doubts",
    "Mark 9:24": "I believe; help my unbelief",
    "Romans 1:20": "Creation makes God's power evident",
    "Hebrews 13:5": "He will never leave or forsake you",
    "James 4:8": "Draw near to God and he draws near",
    "Mark 12:30": "Love God with all your mind",
    "1 Peter 3:15": "Be ready to give a reason for your hope",
    "Psalm 13:1-2": "How long, Yahweh — an honest lament",
    "Psalm 13:5-6": "I trust in your loving kindness",
    "Isaiah 53:3": "He was despised and acquainted with suffering",
    "John 11:35": "Jesus wept",
    "Matthew 5:45": "Rain falls on the just and unjust",
    "Luke 13:2-3": "Suffering isn't proof of greater guilt",
    "James 1:13": "God tempts no one with evil",
    "Genesis 50:20": "Meant for evil; God meant for good",
    "Psalm 34:18": "Near to the brokenhearted",
    "Revelation 21:3-4": "No more death, mourning, or pain",
    "2 Peter 1:20-21": "Scripture came through the Holy Spirit",
    "2 Timothy 3:16": "All Scripture is God-breathed",
    "Isaiah 40:8": "The word of God stands forever",
    "1 Corinthians 15:14": "If Christ wasn't raised, faith is empty",
    "1 Corinthians 15:3-4": "Died, buried, raised on the third day",
    "Matthew 10:28": "Fear the one who judges soul and body",
    "2 Peter 3:9": "Not wishing that any should perish",
    "Revelation 3:20": "He stands at the door and knocks",
    "Romans 2:14-15": "God's law written on the conscience",
    "Genesis 18:25": "Shouldn't the Judge of all the earth do right?",
    "Romans 3:23": "Everyone has sinned",
    "Ephesians 2:8-9": "Saved by grace, not by works",
    "1 Corinthians 8:5-6": "One God, one Lord, despite many claims",
    "John 14:6": "No one comes to the Father except through him",
    "Proverbs 14:12": "A way that seems right leads to death",
    "Titus 3:5": "Saved by mercy, not our own righteousness",
    "1 John 5:13": "Written so you may know you have eternal life",
    "1 John 1:9": "Confess, and he forgives and cleanses",
    "Matthew 6:9": "Our Father in heaven, hallowed be your name",
    "2 Peter 3:18": "Grow in grace and knowledge",
    "Matthew 7:7": "Ask, seek, knock"
  };

  /* The six FAQ categories, each rendered on its own page (questions/<id>.html) */
  var CATEGORIES = [
    {
      id: "doubt",
      short: "Doubt",
      name: "Doubt & Certainty",
      sub: "5 questions",
      kicker: "Category 01 · For when faith feels shaky",
      title: "Doubt & Certainty",
      lede: "The questions that come at 2am, not across a table. These aren't a sign something's wrong with your faith — they're often where it actually starts taking root.",
      facts: [
        ["Shape", "Five honest questions, no easy answers"],
        ["Opens with", "Whether doubt itself is even allowed"],
        ["Best for", "Anyone who feels guilty for wondering"],
        ["Needs", "Willingness to sit with not-knowing"]
      ],
      steps: [
        { h: "Is it okay to doubt?", say: "Doubt isn't the opposite of faith — unbelief is. Even people who watched Jesus rise from the dead still doubted, and Scripture makes room for the honest cry of a desperate father: I believe, help my unbelief.", refs: ["Matthew 28:17", "Mark 9:24"] },
        { h: "How can I know God exists?", say: "Paul's starting argument isn't a leap — it's an observation. What can be known about God is made evident in what he made. That's a reason to keep looking, not a substitute for meeting him directly.", refs: ["Romans 1:20"] },
        { h: "What if I don't feel God's presence?", say: "Feelings rise and fall with sleep, weather, and circumstance. The promise isn't a feeling — it's a person who said he wouldn't leave. Nearness is something to hold onto as fact, not wait for as a mood.", refs: ["Hebrews 13:5", "James 4:8"] },
        { h: "Can I lose my faith by asking hard questions?", say: "Faith looking for understanding isn't weak faith. The first command is to love God with your mind, not just your feelings — asking honestly is part of the relationship, not a threat to it.", refs: ["Mark 12:30", "1 Peter 3:15"] },
        { h: "Why does God feel silent sometimes?", say: "Silence shows up in Scripture too, and it's answered — not always fast. David's psalms move from “how long” to praise inside the very same poem. Waiting is part of the pattern here, not proof of absence.", refs: ["Psalm 13:1-2", "Psalm 13:5-6"] }
      ]
    },
    {
      id: "suffering",
      short: "Suffering",
      name: "Suffering & Evil",
      sub: "5 questions",
      kicker: "Category 02 · The oldest objection",
      title: "Suffering & Evil",
      lede: "The question every honest person asks eventually, believer or not. Scripture doesn't dodge it — some of its rawest writing is aimed directly at God about exactly this.",
      facts: [
        ["Shape", "Five questions, weighed like Job's"],
        ["Opens with", "Why a good God allows pain"],
        ["Best for", "Someone in the middle of it, not just curious"],
        ["Needs", "Patience — this one doesn't resolve in a sentence"]
      ],
      steps: [
        { h: "If God is good, why does he allow suffering?", say: "Scripture doesn't answer this with a formula — it answers with a person who entered suffering rather than explaining it from a safe distance. The cross means God isn't a spectator to pain; he absorbed it.", refs: ["Isaiah 53:3", "John 11:35"] },
        { h: "Why do bad things happen to good people?", say: "Because, by the Bible's own measure, no one clears that bar — and a broken world touches everyone in it, rain falling on the just and the unjust alike. Suffering isn't proof of someone's personal guilt.", refs: ["Matthew 5:45", "Luke 13:2-3"] },
        { h: "Does God cause tragedy, or just allow it?", say: "Scripture holds two things at once: God is sovereign over everything that happens, and evil is never credited to him — it's traced to a fallen world and real choices, and even those, he can still turn toward good.", refs: ["James 1:13", "Genesis 50:20"] },
        { h: "Where is God when it hurts?", say: "Close to the brokenhearted, by name — not a promise that the pain lifts on schedule, but a promise it isn't unwitnessed.", refs: ["Psalm 34:18"] },
        { h: "Will suffering ever actually end?", say: "Yes — and Revelation doesn't describe this as the way things have always been. It describes it as the way things were, past tense, before God makes it new.", refs: ["Revelation 21:3-4"] }
      ]
    },
    {
      id: "bible",
      short: "The Bible",
      name: "Is the Bible True?",
      sub: "5 questions",
      kicker: "Category 03 · Before anything else can be trusted",
      title: "Is the Bible True?",
      lede: "Everything else here rests on whether this book can be trusted, so it's fair to ask that first. The claims underneath it are checkable, not just statements of faith.",
      facts: [
        ["Shape", "Five questions about the document itself"],
        ["Opens with", "Whether it's the same book it started as"],
        ["Best for", "Someone who wants evidence, not assertion"],
        ["Needs", "Willingness to check sources, not just trust them"]
      ],
      steps: [
        { h: "Wasn't the Bible just written by men and changed over the centuries?", say: "Human hands wrote every word — Peter's claim is that they were carried along as they did. The human and the divine authorship aren't a contradiction to untangle; they're the actual claim being made.", refs: ["2 Peter 1:20-21", "2 Timothy 3:16"] },
        { h: "Doesn't the Bible contradict itself?", say: "Most apparent tensions are different authors describing the same event from different vantage points — the same standard historians apply to any other ancient account, without concluding the underlying events didn't happen.", refs: ["2 Timothy 3:16"] },
        { h: "How do we know the text hasn't been changed?", say: "The New Testament's manuscript record dwarfs every other ancient text, in both number of copies and closeness to the originals — some fragments dated within a lifetime of the events they describe.", refs: ["Isaiah 40:8"] },
        { h: "What about the parts that are hard to accept?", say: "A hard passage doesn't disqualify a true one — if anything, it's evidence no one smoothed the record over to make it more comfortable to read.", refs: ["2 Timothy 3:16"] },
        { h: "Why trust this book over any other religious text?", say: "Because of what it claims about itself and about a resurrection it stakes everything on. If that didn't happen, Paul says plainly, the whole thing is empty — that's an unusually falsifiable claim for a sacred text to make.", refs: ["1 Corinthians 15:14", "1 Corinthians 15:3-4"] }
      ]
    },
    {
      id: "judgment",
      short: "Judgment",
      name: "Heaven, Hell & Judgment",
      sub: "5 questions",
      kicker: "Category 04 · The hardest chapter",
      title: "Heaven, Hell & Judgment",
      lede: "The category people avoid and then can't stop thinking about. These questions deserve a direct answer, even in the places where the direct answer is uncomfortable.",
      facts: [
        ["Shape", "Five questions about what's actually at stake"],
        ["Opens with", "Whether hell is even real"],
        ["Best for", "Someone weighing the cost of the claim"],
        ["Needs", "Steady nerves — the heaviest category here"]
      ],
      steps: [
        { h: "Is hell real?", say: "Jesus spoke about it more than anyone else in Scripture — not to frighten for its own sake, but the way a doctor names a real disease rather than letting a patient assume it isn't there.", refs: ["Matthew 10:28"] },
        { h: "How can a loving God send anyone to hell?", say: "He doesn't send anyone against their will — Scripture frames it as a choice he honors rather than overrides. He isn't willing that any perish, but he doesn't force open a door someone keeps shut.", refs: ["2 Peter 3:9", "Revelation 3:20"] },
        { h: "What happens to people who never heard the gospel?", say: "Scripture says two things together: everyone has some knowledge of God through creation and conscience, and God judges with perfect justice, giving each person exactly what's due — the Judge of all the earth does right.", refs: ["Romans 2:14-15", "Genesis 18:25"] },
        { h: "Do good people go to heaven?", say: "By the Bible's own standard, no one clears the bar on merit alone — which is the whole point. Heaven was never framed as a passing grade; it's framed as a gift someone has to receive.", refs: ["Romans 3:23", "Ephesians 2:8-9"] },
        { h: "What is heaven actually like?", say: "Not vague — a renewed creation, not a wispy afterthought. No more death, mourning, or pain, and God himself living among his people rather than at a distance.", refs: ["Revelation 21:3-4"] }
      ]
    },
    {
      id: "religions",
      short: "Other Faiths",
      name: "Other Religions & Exclusivity",
      sub: "4 questions",
      kicker: "Category 05 · The pluralism question",
      title: "Other Religions & Exclusivity",
      lede: "In a room with a dozen belief systems, the exclusive claim is the one that draws the most pushback. It's worth hearing what the claim actually is before deciding it's arrogant.",
      facts: [
        ["Shape", "Four questions about the exclusive claim"],
        ["Opens with", "Whether all religions are really the same"],
        ["Best for", "Someone comparing traditions, not dismissing them"],
        ["Needs", "Comfort with an answer that isn't flattering to everyone equally"]
      ],
      steps: [
        { h: "Aren't all religions basically the same?", say: "They disagree on the most basic questions — who God is, what's actually wrong with us, and how it gets fixed — and not just in style but in substance. They can't all be true at once; that's not a criticism, it's arithmetic.", refs: ["1 Corinthians 8:5-6"] },
        { h: "Isn't it arrogant to say Christianity is the only way?", say: "The claim isn't Christians declaring themselves the way — it's Jesus making that claim about himself. Reporting what he said isn't arrogance; deciding whether to agree with it is the actual question in front of you.", refs: ["John 14:6"] },
        { h: "What about sincere followers of other faiths?", say: "Sincerity was never the measurement Scripture uses. Paul was entirely sincere while persecuting the church, right up until he was confronted with what was actually true — sincerity and correctness are two different things.", refs: ["Proverbs 14:12"] },
        { h: "Can someone be a good person without religion?", say: "By ordinary human measures, yes — but “good” was never the qualifying question here. Being reconciled to God is a different thing from being decent to your neighbors, even though Scripture expects both to travel together.", refs: ["Titus 3:5"] }
      ]
    },
    {
      id: "living",
      short: "Living It",
      name: "Living the Faith",
      sub: "5 questions",
      kicker: "Category 06 · For after you've said yes",
      title: "Living the Faith",
      lede: "The questions don't stop once you believe — they change shape. This category is for the ongoing work, not the starting line.",
      facts: [
        ["Shape", "Five ongoing questions, not a one-time list"],
        ["Opens with", "How to know it actually took"],
        ["Best for", "Someone already inside the faith, still working it out"],
        ["Needs", "Time — none of these settle in one sitting"]
      ],
      steps: [
        { h: "How do I know if I'm really saved?", say: "Not a feeling to keep chasing, but a promise to stand on — written specifically so that those who believe may know, not merely hope.", refs: ["1 John 5:13"] },
        { h: "What if I sin after becoming a Christian?", say: "Confession, not perfection, is the ongoing pattern. He's described as faithful and just to forgive — every time it's brought to him honestly, not just the first time.", refs: ["1 John 1:9"] },
        { h: "How do I actually pray?", say: "Jesus gave a model, not a script to recite word for word. The pattern he taught starts with God's name honored first, then need, then forgiveness, then protection — a shape to fill in, not a formula.", refs: ["Matthew 6:9"] },
        { h: "How do I grow in faith, not just start it?", say: "Ordinary means, repeated without drama: Scripture, prayer, other believers. Grow in grace and knowledge — a direction to keep walking, not a finish line to cross once.", refs: ["2 Peter 3:18"] },
        { h: "What if I have more questions than answers?", say: "That's allowed — arguably expected. Ask, seek, knock is the posture Scripture actually commends: a persistent search, not a demand for instant resolution.", refs: ["Matthew 7:7"] }
      ]
    }
  ];

  return { VERSES: VERSES, GIST: GIST, CATEGORIES: CATEGORIES };
})();
