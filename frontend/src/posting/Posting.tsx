import React, {useEffect, useState} from 'react';
import {Badge, Button, Card, Col, Divider} from 'antd';
import {PostingModal} from "./PostingModal";
import 'emoji-picker-element';

type PostingTypes = {
    idx : number
}

export const Posting = ({idx} : PostingTypes) => {

    let emojiCount = 0;

    const [isVisible, setVisible] = useState(false);

    const showPosting = () => {
        setVisible(!isVisible);
    }

    const [randomNumber, setRandomNumber] = useState(0);

    const randomSelectNumber = () => {
        let number = Math.round(Math.random() * 100);
        setRandomNumber(number);
    };
    setTimeout(randomSelectNumber, 1000);

    const sleep = (ms : number) => {
        return new Promise(res => setTimeout(res, ms));
    }

    const printTestEmoji = async (total : number) => {
        if(emojiCount === 36){
            return;
        }

        for (let i = 0; i < total; i++) {
            let newNode = document.createElement("span");

            var emojis = [
                '😄','😃','😀','😊','☺','😉','😍','😘','😚','😗','😙','😜','😝','😛','😳','😁','😔','😌','😒','😞','😣','😢','😂','😭','😪','😥','😰','😅','😓','😩','😫','😨','😱','😠','😡','😤','😖','😆','😋','😷','😎','😴','😵','😲','😟','😦','😧','😈','👿','😮','😬','😐','😕','😯','😶','😇','😏','😑','👲','👳','👮','👷','💂','👶','👦','👧','👨','👩','👴','👵','👱','👼','👸','😺','😸','😻','😽','😼','🙀','😿','😹','😾','👹','👺','🙈','🙉','🙊','💀','👽','💩','🔥','✨','🌟','💫','💥','💢','💦','💧','💤','💨','👂','👀','👃','👅','👄','👍','👎','👌','👊','✊','✌','👋','✋','👐','👆','👇','👉','👈','🙌','🙏','☝','👏','💪','🚶','🏃','💃','👫','👪','👬','👭','💏','💑','👯','🙆','🙅','💁','🙋','💆','💇','💅','👰','🙎','🙍','🙇','🎩','👑','👒','👟','👞','👡','👠','👢','👕','👔','👚','👗','🎽','👖','👘','👙','💼','👜','👝','👛','👓','🎀','🌂','💄','💛','💙','💜','💚','❤','💔','💗','💓','💕','💖','💞','💘','💌','💋','💍','💎','👤','👥','💬','👣','💭','🐶','🐺','🐱','🐭','🐹','🐰','🐸','🐯','🐨','🐻','🐷','🐽','🐮','🐗','🐵','🐒','🐴','🐑','🐘','🐼','🐧','🐦','🐤','🐥','🐣','🐔','🐍','🐢','🐛','🐝','🐜','🐞','🐌','🐙','🐚','🐠','🐟','🐬','🐳','🐋','🐄','🐏','🐀','🐃','🐅','🐇','🐉','🐎','🐐','🐓','🐕','🐖','🐁','🐂','🐲','🐡','🐊','🐫','🐪','🐆','🐈','🐩','🐾','💐','🌸','🌷','🍀','🌹','🌻','🌺','🍁','🍃','🍂','🌿','🌾','🍄','🌵','🌴','🌲','🌳','🌰','🌱','🌼','🌐','🌞','🌝','🌚','🌑','🌒','🌓','🌔','🌕','🌖','🌗','🌘','🌜','🌛','🌙','🌍','🌎','🌏','🌋','🌌','🌠','⭐','☀','⛅','☁','⚡','☔','❄','⛄','🌀','🌁','🌈','🌊','🎍','💝','🎎','🎒','🎓','🎏','🎆','🎇','🎐','🎑','🎃','👻','🎅','🎄','🎁','🎋','🎉','🎊','🎈','🎌','🔮','🎥','📷','📹','📼','💿','📀','💽','💾','💻','📱','☎','📞','📟','📠','📡','📺','📻','🔊','🔉','🔈','🔇','🔔','🔕','📢','📣','⏳','⌛','⏰','⌚','🔓','🔒','🔏','🔐','🔑','🔎','💡','🔦','🔆','🔅','🔌','🔋','🔍','🛁','🛀','🚿','🚽','🔧','🔩','🔨','🚪','🚬','💣','🔫','🔪','💊','💉','💰','💴','💵','💷','💶','💳','💸','📲','📧','📥','📤','✉','📩','📨','📯','📫','📪','📬','📭','📮','📦','📝','📄','📃','📑','📊','📈','📉','📜','📋','📅','📆','📇','📁','📂','✂','📌','📎','✒','✏','📏','📐','📕','📗','📘','📙','📓','📔','📒','📚','📖','🔖','📛','🔬','🔭','📰','🎨','🎬','🎤','🎧','🎼','🎵','🎶','🎹','🎻','🎺','🎷','🎸','👾','🎮','🃏','🎴','🀄','🎲','🎯','🏈','🏀','⚽','⚾','🎾','🎱','🏉','🎳','⛳','🚵','🚴','🏁','🏇','🏆','🎿','🏂','🏊','🏄','🎣','☕','🍵','🍶','🍼','🍺','🍻','🍸','🍹','🍷','🍴','🍕','🍔','🍟','🍗','🍖','🍝','🍛','🍤','🍱','🍣','🍥','🍙','🍘','🍚','🍜','🍲','🍢','🍡','🍳','🍞','🍩','🍮','🍦','🍨','🍧','🎂','🍰','🍪','🍫','🍬','🍭','🍯','🍎','🍏','🍊','🍋','🍒','🍇','🍉','🍓','🍑','🍈','🍌','🍐','🍍','🍠','🍆','🍅','🌽','🏠','🏡','🏫','🏢','🏣','🏥','🏦','🏪','🏩','🏨','💒','⛪','🏬','🏤','🌇','🌆','🏯','🏰','⛺','🏭','🗼','🗾','🗻','🌄','🌅','🌃','🗽','🌉','🎠','🎡','⛲','🎢','🚢','⛵','🚤','🚣','⚓','🚀','✈','💺','🚁','🚂','🚊','🚉','🚞','🚆','🚄','🚅','🚈','🚇','🚝','🚋','🚃','🚎','🚌','🚍','🚙','🚘','🚗','🚕','🚖','🚛','🚚','🚨','🚓','🚔','🚒','🚑','🚐','🚲','🚡','🚟','🚠','🚜','💈','🚏','🎫','🚦','🚥','⚠','🚧','🔰','⛽','🏮','🎰','♨','🗿','🎪','🎭','📍','🚩','⬆','⬇','⬅','➡','🔠','🔡','🔤','↗','↖','↘','↙','↔','↕','🔄','◀','▶','🔼','🔽','↩','↪','ℹ','⏪','⏩','⏫','⏬','⤵','⤴','🆗','🔀','🔁','🔂','🆕','🆙','🆒','🆓','🆖','📶','🎦','🈁','🈯','🈳','🈵','🈴','🈲','🉐','🈹','🈺','🈶','🈚','🚻','🚹','🚺','🚼','🚾','🚰','🚮','🅿','♿','🚭','🈷','🈸','🈂','Ⓜ','🛂','🛄','🛅','🛃','🉑','㊙','㊗','🆑','🆘','🆔','🚫','🔞','📵','🚯','🚱','🚳','🚷','🚸','⛔','✳','❇','❎','✅','✴','💟','🆚','📳','📴','🅰','🅱','🆎','🅾','💠','➿','♻','♈','♉','♊','♋','♌','♍','♎','♏','♐','♑','♒','♓','⛎','🔯','🏧','💹','💲','💱','©','®','™','〽','〰','🔝','🔚','🔙','🔛','🔜','❌','⭕','❗','❓','❕','❔','🔃','🕛','🕧','🕐','🕜','🕑','🕝','🕒','🕞','🕓','🕟','🕔','🕠','🕕','🕖','🕗','🕘','🕙','🕚','🕡','🕢','🕣','🕤','🕥','🕦','✖','➕','➖','➗','♠','♥','♣','♦','💮','💯','✔','☑','🔘','🔗','➰','🔱','🔲','🔳','◼','◻','◾','◽','▪','▫','🔺','⬜','⬛','⚫','⚪','🔴','🔵','🔻','🔶','🔷','🔸','🔹'
            ];
            // let emoji = document.createTextNode("😍");
            let emoji = document.createTextNode(emojis[Math.floor(Math.random() * emojis.length)]);

            newNode.appendChild(emoji);
            let target = document.getElementById("emojiBox" + idx);
            if (target) {
                newNode.style.fontSize="21px";
                target.append(newNode);
                await sleep(100);
                newNode.style.fontSize="20px";
                await sleep(100);
                emojiCount+=1;
            } else {

            }
        }
    }

    useEffect( () => {
        printTestEmoji(80).then(res => console.log(res));
    },[]);


    return (
        <Col style={{margin: "5px"}}>
            <Card
                title={
                    <div>
                        <Badge
                            className="badge-example"
                            count={randomNumber}
                            style={{
                                fontSize : "20px",
                                backgroundColor: "red",
                                color: "white",
                            }}/>
                        <span>  Hi! This is my first posting :)</span>
                    </div>
                }
                hoverable
                style={{
                    width: "350px",
                    // margin: "16px",
                    display: "block",
                    overflow : "auto"
                }}
                cover={<img alt="test_img" src="http://localhost:3000/logo.svg"/>}
                bordered={false}
                onClick={showPosting}
            >
                <Divider
                    plain
                    style={{
                        fontSize: "40px",
                    }}
                >😈</Divider>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                dolore magna aliqua.
                Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                consequat. Duis aute irure
                dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
                occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum.
                <Divider orientation={"right"}>
                    <Badge count={41}/>
                </Divider>
                <div>
                    <PostingModal idx={idx} isVisible={isVisible} setVisible={setVisible}/>
                </div>
                <div id={"emojiBox" + idx} style={{fontSize: "12px", height : "100px", overflow : "auto"}}>
                </div>
                <Divider/>
                <Button type="primary" color="red">Leave Emoji</Button>
            </Card>
        </Col>
    )
}
