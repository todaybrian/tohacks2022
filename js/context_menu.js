class Button {
    constructor(text, onClick, isValid = () => true) {
        if (typeof text === 'string' || text instanceof String) {
            this.textFunc = () => text;
        } else {
            this.textFunc = text;
        }
        //this.text = text;
        this.onClick = onClick;
        this.isValid = isValid;
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

        function addButton(innerText, onClick, isValid) {
            let btn = document.createElement('button');
            btn.innerText = innerText;
            if (isValid) {
                btn.onclick = () => {
                    onClick(e);
                    exitMenu();
                }
            } else {
                btn.disabled = true;
            }
            ctxMenu.appendChild(btn);
        }

        for (const button of buttons) {
            addButton(button.text, button.onClick, button.isValid());
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
