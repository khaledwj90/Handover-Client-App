// @flow

import * as React from 'react';



class AppStyle {

    //=========== COLORS ============
    primary_color_1 = '#0c1256';
    primary_color_2 = '#142e8c';
    primary_color_3 = '#198300';
    primary_color_4 = '#5de000';

    secondary_color_1 = '#6f0091';
    secondary_color_2 = '#f02b3a';
    secondary_color_3 = '#e00000';
    secondary_color_4 = '#fdb725';

    supporting_color_1 = '#1445b9';
    supporting_color_2 = '#071e74';
    supporting_color_3 = '#47c7ec';
    supporting_color_4 = '#47c6b4';
    supporting_color_5 = '#85b8fd';

    base_color_1 = '#000000';
    base_color_2 = '#333333';
    base_color_3 = '#444444';
    base_color_4 = '#6d6d6d';
    base_color_5 = '#7c7c7c';
    base_color_6 = '#a9a9a9';
    base_color_7 = '#b3b3b3';
    base_color_8 = '#e5e5e5';
    base_color_9 = '#f3f3f3';
    base_color_10 = '#ffffff';

    indication_color_1 = '#1445b9';
    indication_color_2 = '#3ccbf0';
    indication_color_3 = '#47c6b4';
    indication_color_4 = '#c2cdd6';

    body_bg_color_1 = '#142e8c';
    body_bg_color_2 = '#1445b9';
    body_bg_color_3 = '#3cccf1';
    body_bg_color_4 = '#f3f7fd';
    body_bg_color_5 = '#ffffff';
    body_bg_color_6 = '#20242a';
    body_bg_color_7 = '#2a3036';
    body_bg_color_8 = '#000000';

    gradiant_color_1 = ['#0c1256', '#142e8c'];
    gradiant_color_2 = ['#6f0091', '#f02b3a'];
    gradiant_color_3 = ['#e00000', '#fdb725'];
    gradiant_color_4 = ['#198300', '#5de000'];


    disabled_opacity: number = 0.5;
    header_height = 60;
    page_padding = 15;
    card_border_radius = 10;

    constructor(colors: Object) {

    }

    setColors(colors: Object) {

        this.isYouth = false;

    }
}

const Theme = new AppStyle();
export default Theme

