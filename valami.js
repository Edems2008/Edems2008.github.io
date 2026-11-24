/* =========================================================
   NYELV (magyar / angol)
   - Első látogatáskor a böngésző nyelve alapján választ
   - A HU / EN gombbal át lehet váltani, és megjegyzi
   - A magyar szöveg az index.html-ben van, az angol itt lent
   ========================================================= */

const forditas = {
    en: {
        oldalcim: "Check out my site",
        ip_masolva: "IP copied!",

        alcim: "About me (Edems) and this website 😊",

        bemutato: `
            <p><strong>Hey! I'm Edems! 👋</strong></p>
            <p>I work on game development and all kinds of virtual projects. I made this site to show you my own little virtual world and my projects.</p>
            <p>If you're interested in my first Roblox game, or you'd like to join one of my Discord communities, you're in the right place! You'll find both my global and my Hungarian Discord server here.</p>
            <p>Feel free to look around and check out my work, and if you like something, go ahead and join! And if you just stopped by out of curiosity, that's fine too!</p>
            <p><strong>Enjoy browsing, and thanks for stopping by! 😁 Bye!</strong></p>
        `,

        biome_cim: "BIOME BREAKER (my Roblox game)",
        biome_szoveg: `
            <p>If you're curious about what this game called <strong>BIOME BREAKER</strong> is, you're in the right place!</p>
            <p>BIOME BREAKER is a Roblox parkour game with 100 checkpoints across several different biomes!</p>
            <p>The game is currently in <strong>Alpha</strong> and under active development. The next update could be a small fix, or even the long-awaited Beta version!</p>
            <p>If you run into any problems with the game, please report them with the in-game Report feature, or through the contact account listed on the game's profile!</p>
            <p>Enough with the details! Below this description you'll find a <strong>Join the Roblox game</strong> button. Click it and it takes you straight to the game!</p>
            <p><strong>Have fun, and good luck reaching all 100 checkpoints! 😁</strong></p>
        `,
        biome_gomb: "Join the Roblox game",

        global_cim: "NexVibe | GLOBAL 🌍 (Discord server)",
        global_szoveg: `
            <p><strong class="szoveg-cim">🌍 Welcome to our community!</strong></p>
            <p>If you're still here on the website and would like to join a global Discord server that's open and welcoming to everyone, you're in the right place!</p>
            <p>Everyone is welcome on our server, regardless of gender, nationality, religion or any other affiliation. The staff and I are working to build a truly friendly, close-knit and welcoming community where everyone can feel at home.</p>
            <p>Respecting each other's opinions and views is important to us. Of course, not everyone has to agree on everything, but we expect everyone to treat each other politely and with respect. We don't support discrimination against others, personal attacks, or trying to force your own beliefs on others – whether it's about religion or any other personal view.</p>
            <p>If you have a problem with someone, or feel like you're not being treated fairly, don't hesitate to reach out to one of the server's admins or higher-ranking staff members. You'll find the rank list and the server rules in the appropriate channels.</p>
            <p><strong>Our goal is simple: to build a community where everyone can be themselves, and where mutual respect comes first! ❤️</strong></p>
            <p><strong class="szoveg-cim">🚀 Want to join us?</strong></p>
            <p>If you'd like to be part of the NexVibe GLOBAL community, just click the <strong>"Join NexVibe GLOBAL"</strong> button below, and you'll be one of us in no time!</p>
            <p><strong>We can't wait to see you! ❤️</strong></p>
        `,
        global_gomb: "Join NexVibe GLOBAL",

        hun_cim: "NexVibe | HUN (Discord server)",
        hun_szoveg: `
            <p><strong class="szoveg-cim">🇭🇺 Welcome to the NexVibe | HUN community!</strong></p>
            <p>If you're looking for a friendly, active and close-knit Hungarian Discord community where you can meet new people, chat, play games or just have a good time, you're in the right place!</p>
            <p>The goal of NexVibe | HUN is to build a community where everyone can find their place. Whether it's gaming, group events, everyday conversations or making new friends, there's room for all of it here.</p>
            <p>Mutual respect and good behavior are important to us. It doesn't matter where you come from, what your interests are, or how talkative you are – everyone who wants to be part of a good community is welcome.</p>
            <p>If you have any problems or questions, don't hesitate to reach out to one of the server's admins or higher-ranking staff members. You'll find the rank list and the server rules in the appropriate channels.</p>
            <p>We want NexVibe | HUN to be more than just a Discord server: a community you're happy to come back to! ❤️</p>
            <p><strong class="szoveg-cim">🚀 Want to join us?</strong></p>
            <p>If you'd like to be part of the NexVibe | HUN community, click the <strong>"Join NexVibe | HUN"</strong> button below and join us!</p>
            <p><strong>We can't wait to see you! 🇭🇺❤️</strong></p>
            <p><em>Note: the main language of this server is Hungarian.</em></p>
        `,
        hun_gomb: "Join NexVibe | HUN"
    },

    hu: {
        oldalcim: "Csekold le az oldalam",
        ip_masolva: "IP kimásolva!"
        // a többi magyar szöveget az oldal betöltéskor az index.html-ből veszi
    }
};

// A magyar szövegek elmentése az index.html-ből
document.querySelectorAll("[data-i18n]").forEach(el => {
    forditas.hu[el.dataset.i18n] = el.innerHTML;
});

let aktualisNyelv = "hu";

function nyelvBeallit(nyelv){
    if(!forditas[nyelv]) nyelv = "hu";
    aktualisNyelv = nyelv;

    document.querySelectorAll("[data-i18n]").forEach(el => {
        const szoveg = forditas[nyelv][el.dataset.i18n];
        if(szoveg !== undefined) el.innerHTML = szoveg;
    });

    document.documentElement.lang = nyelv;
    document.title = forditas[nyelv].oldalcim;

    document.querySelectorAll(".nyelv-gomb").forEach(gomb => {
        gomb.classList.toggle("aktiv", gomb.dataset.lang === nyelv);
    });

    // A nyitott lenyíló magassága igazodjon az új szöveghez
    document.querySelectorAll(".faq-item.active").forEach(item => {
        const valasz = item.querySelector(".faq-answer");
        valasz.style.maxHeight = valasz.scrollHeight + "px";
    });

    try { localStorage.setItem("nyelv", nyelv); } catch(e) {}
}

function kezdoNyelv(){
    // 1) Ha már választott korábban, azt használjuk
    try {
        const mentett = localStorage.getItem("nyelv");
        if(mentett && forditas[mentett]) return mentett;
    } catch(e) {}

    // 2) Különben a böngésző nyelve: magyar -> HU, minden más -> EN
    const nyelvek = navigator.languages || [navigator.language || "hu"];
    return nyelvek.some(n => n.toLowerCase().startsWith("hu")) ? "hu" : "en";
}

document.querySelectorAll(".nyelv-gomb").forEach(gomb => {
    gomb.addEventListener("click", () => nyelvBeallit(gomb.dataset.lang));
});

nyelvBeallit(kezdoNyelv());


/* FAQ LENYÍLÓ */

const faqItems = document.querySelectorAll(".faq-item");

function nyit(item){
    const valasz = item.querySelector(".faq-answer");
    item.classList.add("active");
    valasz.style.maxHeight = valasz.scrollHeight + "px";   // pont akkora, amilyen hosszú a szöveg
}

function zar(item){
    const valasz = item.querySelector(".faq-answer");
    item.classList.remove("active");
    valasz.style.maxHeight = null;
}

faqItems.forEach(item => {

    const question = item.querySelector(".faq-question");

    question.addEventListener("click", () => {

        // Bezár minden másikat
        faqItems.forEach(otherItem => {
            if(otherItem !== item){
                zar(otherItem);
            }
        });

        // Aktuális nyit/zár
        if(item.classList.contains("active")){
            zar(item);
        } else {
            nyit(item);
        }

    });

});

// Ha átméretezik az ablakot, a nyitott lenyíló magassága igazodjon
window.addEventListener("resize", () => {
    document.querySelectorAll(".faq-item.active").forEach(item => {
        const valasz = item.querySelector(".faq-answer");
        valasz.style.maxHeight = valasz.scrollHeight + "px";
    });
});

function masolIP(){

    navigator.clipboard.writeText(
        "lifestal.exaroton.me:47692"
    );

    alert(forditas[aktualisNyelv].ip_masolva);
}
