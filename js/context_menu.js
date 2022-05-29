class Button {
    constructor(text, onClick) {
        if (typeof text === 'string' || text instanceof String) {
            this.textFunc = () => text;
        } else {
            this.textFunc = text;
        }
        this.onClick = onClick;
    }

    get text() {
        return this.textFunc();
    }
}

function addContextMenu(elem, buttons, before=() => {}, after=() => {}) {
    elem.oncontextmenu = (e) => {
        if (e.target.id != elem.id) {
            return;
        }

        before(e);
        e.preventDefault();

        let ctxMenu = document.createElement('div');
        ctxMenu.setAttribute('id', 'context_menu');
        ctxMenu.style.left = `${e.pageX}px`;
        ctxMenu.style.top = `${e.pageY}px`;

        function exitMenu() {
            after(e);
            ctxMenu.remove();
            ctxExit.style.display = 'none';
        }

        function addButton(innerText, onClick) {
            let btn = document.createElement('button');
            btn.innerText = innerText;
            btn.onclick = () => {
                onClick(e);
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
        ctxExit.oncontextmenu = (e) => {
            e.preventDefault();
            exitMenu();
        }

        document.body.appendChild(ctxMenu);
    }
}
