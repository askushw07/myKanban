const style = ["adventurer", 'adventurer-neutral', "avataaars",
    "avataaars-neutral", "big-ears", "big-ears-neutral", "big-smile", "bottts",
    "bottts-neutral", "croodles", "croodles-neutral", "fun-emoji", "icons"]

function createAvatar() {
    const num = Math.floor(Math.random() * style.length);
    return `https://api.dicebear.com/7.x/${list[num]}/svg`;
}