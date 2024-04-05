import { EventEmitter } from '../../stencil-public-runtime';
export declare class IrButton {
    name: string;
    text: any;
    icon: string;
    btn_color: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark';
    size: 'sm' | 'md' | 'lg';
    textSize: 'sm' | 'md' | 'lg';
    btn_block: boolean;
    btn_disabled: boolean;
    btn_type: string;
    isLoading: boolean;
    btn_styles: string;
    btn_id: string;
    clickHanlder: EventEmitter<any>;
    private buttonEl;
    handleButtonAnimation(e: CustomEvent): void;
    render(): any;
}
