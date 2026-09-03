/* Six Ways to Tell It — content.
   Verse text: World English Bible (public domain), via bible-api.com.
   Edit this file to change wording, add a framework, or swap the translation.
   Shape: window.GOSPEL = { VERSES, GIST, METHODS } */

window.GOSPEL = (function () {

  /* Full verse text, keyed by reference exactly as written in METHODS[].steps[].refs */
  var VERSES = {
    "Ecclesiastes 7:20": "Surely there is not a righteous man on earth, who does good and doesn't sin.",
    "Isaiah 1:18": "“Come now, and let us reason together,” says Yahweh: “Though your sins be as scarlet, they shall be as white as snow. Though they be red like crimson, they shall be as wool.”",
    "John 1:12": "But as many as received him, to them he gave the right to become God's children, to those who believe in his name.",
    "John 3:16": "For God so loved the world, that he gave his one and only Son, that whoever believes in him should not perish, but have eternal life.",
    "John 10:10": "The thief only comes to steal, kill, and destroy. I came that they may have life, and may have it abundantly.",
    "John 14:6": "I am the way, the truth, and the life. No one comes to the Father, except through me.",
    "Acts 16:31": "Believe in the Lord Jesus Christ, and you will be saved, you and your household.",
    "Romans 3:23": "for all have sinned, and fall short of the glory of God;",
    "Romans 5:1": "Being therefore justified by faith, we have peace with God through our Lord Jesus Christ;",
    "Romans 5:8": "But God commends his own love toward us, in that while we were yet sinners, Christ died for us.",
    "Romans 6:23": "For the wages of sin is death, but the free gift of God is eternal life in Christ Jesus our Lord.",
    "Romans 8:1": "There is therefore now no condemnation to those who are in Christ Jesus, who don't walk according to the flesh, but according to the Spirit.",
    "Romans 8:38–39": "For I am persuaded that neither death, nor life, nor angels, nor principalities, nor things present, nor things to come, nor powers, nor height, nor depth, nor any other created thing, will be able to separate us from God's love, which is in Christ Jesus our Lord.",
    "Romans 10:9": "that if you will confess with your mouth that Jesus is Lord, and believe in your heart that God raised him from the dead, you will be saved.",
    "Romans 10:13": "Whoever will call on the name of the Lord will be saved.",
    "1 Corinthians 15:3–4": "For I delivered to you first of all that which I also received: that Christ died for our sins according to the Scriptures, that he was buried, that he was raised on the third day according to the Scriptures,",
    "2 Corinthians 5:17": "Therefore if anyone is in Christ, he is a new creation. The old things have passed away. Behold, all things have become new.",
    "Ephesians 2:8–9": "for by grace you have been saved through faith, and that not of yourselves; it is the gift of God, not of works, that no one would boast.",
    "Hebrews 9:27": "Inasmuch as it is appointed for men to die once, and after this, judgment,",
    "1 Peter 3:18": "Because Christ also suffered for sins once, the righteous for the unrighteous, that he might bring you to God; being put to death in the flesh, but made alive in the spirit;",
    "2 Peter 3:18": "But grow in the grace and knowledge of our Lord and Savior Jesus Christ. To him be the glory both now and forever. Amen.",
    "1 John 1:9": "If we confess our sins, he is faithful and righteous to forgive us the sins, and to cleanse us from all unrighteousness.",
    "1 John 2:2": "And he is the atoning sacrifice for our sins, and not for ours only, but also for the whole world.",
    "1 John 5:13": "These things I have written to you who believe in the name of the Son of God, that you may know that you have eternal life, and that you may continue to believe in the name of the Son of God.",
    "Revelation 3:20": "Behold, I stand at the door and knock. If anyone hears my voice and opens the door, then I will come in to him, and will dine with him, and he with me.",
    "Revelation 21:4": "He will wipe away every tear from their eyes. Death will be no more; neither will there be mourning, nor crying, nor pain, any more. The first things have passed away."
  };

  /* One-line gist for the cross-reference table */
  var GIST = {
    "Romans 3:23": "Everyone has sinned",
    "Romans 6:23": "Sin's wage is death; God's gift is life",
    "Romans 5:8": "Christ died for us while we were still sinners",
    "John 3:16": "God gave his Son so believers would not perish",
    "Ephesians 2:8–9": "Saved by grace through faith, not works",
    "John 1:12": "Those who receive him become God's children",
    "John 10:10": "Jesus came to give abundant life",
    "Acts 16:31": "Believe on the Lord Jesus and be saved",
    "1 Corinthians 15:3–4": "Died, buried, raised on the third day",
    "John 14:6": "No one comes to the Father except through him",
    "Romans 10:9": "Confess with your mouth, believe in your heart",
    "Romans 10:13": "Whoever calls on the Lord will be saved",
    "Revelation 3:20": "He stands at the door and knocks",
    "1 John 1:9": "Confess, and he forgives and cleanses",
    "Romans 5:1": "Justified by faith, at peace with God",
    "Romans 8:1": "No condemnation for those in Christ",
    "Romans 8:38–39": "Nothing can separate us from God's love",
    "Hebrews 9:27": "We die once, then face judgment",
    "1 Peter 3:18": "The righteous suffered for the unrighteous",
    "1 John 2:2": "He is the atoning sacrifice for the whole world",
    "1 John 5:13": "Written so you may know you have eternal life",
    "2 Corinthians 5:17": "In Christ, a new creation",
    "2 Peter 3:18": "Grow in grace and knowledge",
    "Ecclesiastes 7:20": "No one on earth is righteous",
    "Isaiah 1:18": "Scarlet sins made white as snow",
    "Revelation 21:4": "No more death, mourning, or pain"
  };

  /* The six frameworks. `draw` is optional and only used by the two sketched ones. */
  var METHODS = [
    {
      id: "romans",
      short: "Romans Road",
      name: "The Romans Road",
      sub: "5 stops · verses only",
      kicker: "Framework 01 · A route through one letter",
      title: "The Romans Road",
      lede: "Not an illustration but an itinerary — five stops in Paul's letter to the Romans, taken in order. Because every verse sits in one book, you can walk it in a Bible without flipping around.",
      facts: [
        ["Shape", "A chain of verses, read in sequence"],
        ["Opens with", "The problem: everyone has sinned"],
        ["Best for", "Someone willing to open a Bible with you"],
        ["Needs", "A Bible, or the five references memorized"]
      ],
      steps: [
        { h: "Everyone has sinned", say: "Start with the thing that's true of both of you. Not a list of their failings — a universal condition, yours included.", refs: ["Romans 3:23"] },
        { h: "Sin costs something", say: "The first half of the verse: sin is not a mistake to be absorbed. It earns a wage, and the wage is death — physical and eternal separation from God.", refs: ["Romans 6:23"] },
        { h: "God paid it himself", say: "The second half of the same verse turns it: the wage is earned, the life is a gift. Then show when that gift was offered — not after we cleaned up, but while we were still sinners.", refs: ["Romans 5:8"] },
        { h: "Confess and believe", say: "Here's the response. Not a ritual: an inward trust that God raised him, and an outward acknowledgment that Jesus is Lord.", refs: ["Romans 10:9", "Romans 10:13"] },
        { h: "What you actually get", say: "Close on the results, because the offer is worth naming: peace with God, no condemnation, and nothing in creation that can separate you from his love.", refs: ["Romans 5:1", "Romans 8:1", "Romans 8:38–39"] }
      ]
    },
    {
      id: "fourlaws",
      short: "Four Laws",
      name: "The Four Spiritual Laws",
      sub: "4 laws · booklet",
      kicker: "Framework 02 · Bill Bright, Cru, 1952",
      title: "The Four Spiritual Laws",
      lede: "The most widely printed gospel tract ever made, and the one that set the template: four propositions, stated as laws, that move from God's love to your response. Written to be read aloud from a booklet with someone.",
      facts: [
        ["Shape", "Four numbered propositions"],
        ["Opens with", "God's love and plan for your life"],
        ["Best for", "A first conversation with a stranger"],
        ["Needs", "Nothing — designed to be memorized"]
      ],
      steps: [
        { h: "God loves you and offers a wonderful plan for your life", say: "The deliberate choice of this framework: lead with love, not sin. Someone who has never heard the gospel as good news hears it here first.", refs: ["John 3:16", "John 10:10"] },
        { h: "Man is sinful and separated from God, so he cannot know or experience God's love and plan", say: "The obstacle, framed as a relational one. The problem isn't only guilt — it's that the plan in law one is unreachable from here.", refs: ["Romans 3:23", "Romans 6:23"] },
        { h: "Jesus Christ is God's only provision for man's sin — through him you can know and experience God's love and plan", say: "Three claims: he died in our place, he rose, and he is the only way. The exclusivity is stated, not softened.", refs: ["Romans 5:8", "1 Corinthians 15:3–4", "John 14:6"] },
        { h: "We must individually receive Jesus Christ as Savior and Lord", say: "“Individually” is doing the work here — knowing the first three laws is not the same as receiving him. This is where the booklet invites a prayer.", refs: ["John 1:12", "Ephesians 2:8–9", "Acts 16:31", "Revelation 3:20"] }
      ]
    },
    {
      id: "bridge",
      short: "Bridge",
      name: "The Bridge to Life",
      sub: "4 stages · drawn",
      kicker: "Framework 03 · The Navigators",
      title: "The Bridge to Life",
      lede: "A drawing, made while you talk. Two cliff edges, a chasm between them, and a cross laid across it as the only span. The other person watches the picture assemble — and can redraw it for someone else afterward.",
      facts: [
        ["Shape", "One diagram, built in four moves"],
        ["Opens with", "God's intent: life to the full"],
        ["Best for", "A visual thinker, over coffee"],
        ["Needs", "A napkin and a pen"]
      ],
      steps: [
        { h: "God", draw: "Draw the left cliff edge. Label it GOD.", say: "God made us to know him, and what he offers isn't bare survival — it's life to the full.", refs: ["John 3:16", "John 10:10"] },
        { h: "Our problem", draw: "Draw the right cliff edge lower, and open a chasm between them. Label the chasm SIN. Draw small arrows from the right edge — good works, religion, money — all falling short.", say: "We chose our own way, and the gap is real. Then show the attempts to cross it: everything we try falls into the canyon, because the crossing was never something we could build.", refs: ["Romans 3:23", "Romans 6:23", "Hebrews 9:27", "Ephesians 2:8–9"] },
        { h: "God's solution", draw: "Draw a cross spanning the chasm, its beam resting on both edges.", say: "God did what we couldn't: he laid the bridge himself, and it cost him his Son. The righteous one suffered for the unrighteous — to bring us to God.", refs: ["Romans 5:8", "1 Peter 3:18"] },
        { h: "Our response", draw: "Draw a figure on the right edge, walking across the cross.", say: "A bridge you don't step onto doesn't help you. Admit the gap, believe Christ spanned it, and cross — receive him, open the door.", refs: ["John 1:12", "Revelation 3:20"] }
      ]
    },
    {
      id: "circles",
      short: "3 Circles",
      name: "3 Circles",
      sub: "3 circles · drawn",
      kicker: "Framework 04 · Life Conversation Guide",
      title: "3 Circles",
      lede: "The newest of the six, and the one that starts from what the other person already feels. Three circles and four arrows, drawn in the order of the conversation — brokenness first, because that's where the person is standing.",
      facts: [
        ["Shape", "Three circles joined by arrows"],
        ["Opens with", "Brokenness — the world as they see it"],
        ["Best for", "Someone who already senses something is wrong"],
        ["Needs", "A napkin and a pen"]
      ],
      steps: [
        { h: "Brokenness", draw: "Draw a circle with a jagged line through it. Label it BROKENNESS.", say: "Start where they live. Anxiety, a family coming apart, the news. “We live in a broken world — in fact, we were born into it.” Name something specific to them, not a generality.", refs: ["Ecclesiastes 7:20"] },
        { h: "God's design", draw: "Draw a second circle above and to the left, with a heart inside. Label it GOD'S DESIGN.", say: "It wasn't built this way. God made the world good, and made us for life with him — abundant life, not the version we're living.", refs: ["John 10:10"] },
        { h: "Sin — the arrow down", draw: "Draw an arrow from God's Design to Brokenness. Label it SIN.", say: "How we got from there to here: sin is the choice to leave God out and do it our own way. Then note the escape attempts — money, success, relationships — arrows that curve out of Brokenness and fall back into it.", refs: ["Romans 3:23", "Romans 6:23"] },
        { h: "The gospel", draw: "Draw a third circle with a cross and a crown inside. Label it GOSPEL.", say: "God sent his Son — fully God and fully man, born of a virgin, lived a perfect life, died on the cross, rose on the third day. He took the punishment we earned and broke sin's hold.", refs: ["Romans 5:8", "1 Corinthians 15:3–4"] },
        { h: "Repent and believe — the arrow up", draw: "Draw an arrow from Brokenness to Gospel. Label it REPENT & BELIEVE.", say: "Turning is the response: away from doing it our way, toward trusting him.", refs: ["Acts 16:31", "Romans 10:9"] },
        { h: "Recover and pursue — the arrow home", draw: "Draw an arrow from Gospel back to God's Design. Label it RECOVER & PURSUE.", say: "You're not returned to a neutral state — you're made new and reconnected to what you were designed for. Then ask the three questions: Which circle are you in? Which do you want to be in? What's keeping you from following Jesus?", refs: ["2 Corinthians 5:17"] }
      ]
    },
    {
      id: "wordless",
      short: "Wordless",
      name: "The Wordless Book",
      sub: "5 colors · no text",
      kicker: "Framework 05 · Spurgeon, 1866 · CEF",
      title: "The Wordless Book",
      lede: "Five blank colored pages and nothing written on any of them. Charles Spurgeon preached it in 1866; Hudson Taylor carried it to China; Child Evangelism Fellowship added the fifth color. It's the one framework here that works with a child, or without literacy.",
      facts: [
        ["Shape", "Five colored pages, turned in order"],
        ["Opens with", "Gold — heaven, and God's love"],
        ["Best for", "Children, and cross-language settings"],
        ["Needs", "Five colored pages, or five beads"]
      ],
      steps: [
        { h: "Gold — heaven", draw: "Turn to the gold page.", say: "God's home is real and it's good: no more death, no more crying, no more pain. He loves you and wants you there with him.", refs: ["Revelation 21:4", "John 3:16"] },
        { h: "Black — sin", draw: "Turn to the black page.", say: "Something keeps us out, and it's in us. Every one of us has done wrong — not just the grown-ups, and not just other people.", refs: ["Romans 3:23"] },
        { h: "Red — the blood of Christ", draw: "Turn to the red page.", say: "Jesus died in our place. He didn't wait for us to be good first — he came while we were still in the black page.", refs: ["Romans 5:8", "1 John 2:2"] },
        { h: "White — clean", draw: "Turn to the white page.", say: "What he does with the black: sins the color of scarlet come out white as snow. Confess them, and he forgives and cleanses — all of it.", refs: ["1 John 1:9", "Isaiah 1:18"] },
        { h: "Green — growth", draw: "Turn to the green page.", say: "What happens next. Green is what grows — you keep growing in knowing him, through the Bible, prayer, and other Christians. Being forgiven is the beginning, not the end.", refs: ["2 Peter 3:18"] }
      ]
    },
    {
      id: "plan",
      short: "Plan",
      name: "The Plan of Salvation",
      sub: "4 questions · explanatory",
      kicker: "Framework 06 · GotQuestions.org",
      title: "The Plan of Salvation",
      lede: "The least illustrated and most explanatory of the six — structured as four questions rather than a drawing or a numbered tract. Useful when someone wants the reasoning, not the presentation.",
      facts: [
        ["Shape", "Why · What · How · What then"],
        ["Opens with", "The reason anything needed doing"],
        ["Best for", "Someone asking sincere questions"],
        ["Needs", "Time, and willingness to be interrupted"]
      ],
      steps: [
        { h: "Why — the problem", say: "Not one person on earth is righteous. This isn't a claim about especially bad people; it's a claim about all of them, and it's the premise everything else rests on.", refs: ["Ecclesiastes 7:20", "Romans 3:23"] },
        { h: "Why — what it costs", say: "Because God is holy and just, sin can't simply be waved through. The penalty is death and eternal separation from him.", refs: ["Romans 6:23", "Hebrews 9:27"] },
        { h: "What — God's solution", say: "Jesus — God in human form — lived a sinless life and died as the sacrifice for sin, fully paying it. The resurrection is the proof the payment was accepted.", refs: ["1 John 2:2", "1 Corinthians 15:3–4"] },
        { h: "How — the response", say: "Belief. Not a set of works to complete first, and not a partial trust supplemented by your own record — faith in Jesus alone, who is the only way to the Father.", refs: ["Acts 16:31", "John 3:16", "Ephesians 2:8–9", "John 14:6"] },
        { h: "What then — the outcome", say: "Forgiveness, eternal life, and — the point of John's letter — assurance: it was written so you may know, not hope.", refs: ["1 John 5:13", "Romans 8:38–39"] }
      ]
    }
  ];

  return { VERSES: VERSES, GIST: GIST, METHODS: METHODS };
})();
