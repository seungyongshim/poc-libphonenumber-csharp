﻿import EventHandler from "./base/event-handler.js"
import BlazorComponent from "./base/blazor-component.js"
import { getElement } from "./base/index.js"

export class Upload extends BlazorComponent {
    static get Default() {
        return {
            browserClass: '.btn-browser'
        }
    }

    _init() {
        this._inputFile = this._element.querySelector('[type="file"]')
        this._setListeners()
    }

    _setListeners() {
        EventHandler.on(this._element, 'click', this._config.browserClass, () => {
            this._inputFile.click()
        })

        //阻止浏览器默认行为
        EventHandler.on(document, "dragleave", e => {
            e.preventDefault()
        })
        EventHandler.on(document, 'drop', e => {
            e.preventDefault()
        })
        EventHandler.on(document, 'dragenter', e => {
            e.preventDefault()
        })
        EventHandler.on(document, 'dragover', e => {
            e.preventDefault()
        })

        EventHandler.on(this._element, 'drop', e => {
            try {
                //获取文件对象
                const fileList = e.dataTransfer.files

                //检测是否是拖拽文件到页面的操作
                if (fileList.length === 0) {
                    return false;
                }

                this._inputFile.files = e.dataTransfer.files;
                const event = new Event('change', { bubbles: true });
                this._inputFile.dispatchEvent(event);
            } catch (e) {
                console.error(e);
            }
        })

        EventHandler.on(this._element, 'paste', e => {
            this._inputFile.files = e.clipboardData.files;
            const event = new Event('change', { bubbles: true });
            this._inputFile.dispatchEvent(event);
        });
    }

    _execute(args) {
        const tooltipId = args[0]
        const method = args[1]
        if (method === 'disposeTooltip' && tooltipId) {
            const element = getElement(`#${tooltipId}`)
            if (element) {
                const tooltip = bootstrap.Tooltip.getInstance(element)
                if (tooltip) {
                    tooltip.dispose()
                }
            }
        }
    }

    _dispose() {
        EventHandler.off(this._element, 'click', this._config.browserClass)
        EventHandler.off(document, 'dragleave');
        EventHandler.off(document, 'drop');
        EventHandler.off(document, 'dragenter');
        EventHandler.off(document, 'dragover');
        EventHandler.off(this._element, 'drop');
        EventHandler.off(this._element, 'paste');
    }
}
