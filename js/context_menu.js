class Button {
    constructor(text, onClick) {
        this.text = text;
        this.onClick = onClick;
    }
}

function addContextMenu(elem, buttons, before=() => {}, after=() => {}) {
    elem.oncontextmenu = (e) => {
        before();
        e.preventDefault();

        let ctxMenu = document.createElement('div');
        ctxMenu.setAttribute('id', 'context_menu');
        ctxMenu.style.left = `${e.pageX}px`;
        ctxMenu.style.top = `${e.pageY}px`;

        function exitMenu() {
            after();
            ctxMenu.remove();
            ctxExit.style.display = 'none';
        }

        function addButton(innerText, onClick) {
            let btn = document.createElement('button');
            btn.innerText = innerText;
            btn.onclick = () => {
                onClick();
                exitMenu();
            }
            ctxMenu.appendChild(btn);
        }

        for (const button of buttons) {
            addButton(button.text, button.onClick);
        }

        let ctxExit = document.getElementById("context_menu_exit");
        ctxExit.style.display = 'inline';

        ctxExit.onclick = exitMenu;

        document.body.appendChild(ctxMenu);
    }
}
