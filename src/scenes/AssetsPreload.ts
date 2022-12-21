import Phaser from 'phaser';

export function edbc_preload(scene: Phaser.Scene) {

     /* Board */
     scene.load.image('background', 'assets/images/board/edbc_board_bg.png');
     scene.load.image('areas_layer', 'assets/images/board/edbc_board_layout.png');
     
     /* Ship Card Backgrounds */
     scene.load.image('bg_ship_alliance', 'assets/images/cards/common/edbc_ship_card_bg__alliance.png');
     scene.load.image('bg_ship_empire', 'assets/images/cards/common/edbc_ship_card_bg__empire.png');
     scene.load.image('bg_ship_federation', 'assets/images/cards/common/edbc_ship_card_bg__federation.png');
     scene.load.image('bg_ship_neutral', 'assets/images/cards/common/edbc_ship_card_bg__neutral.png');

     /* Action Card Backgrounds */
     scene.load.image('bg_action_alliance', 'assets/images/cards/common/edbc_action_card_bg__alliance.png');
     scene.load.image('bg_action_empire', 'assets/images/cards/common/edbc_action_card_bg__empire.png');
     scene.load.image('bg_action_federation', 'assets/images/cards/common/edbc_action_card_bg__federation.png');
     scene.load.image('bg_action_neutral', 'assets/images/cards/common/edbc_action_card_bg__neutral.png');

     /* Outfitting Card Background */
     scene.load.image('bg_outfitting', 'assets/images/cards/common/edbc_outfitting_card_bg.png');
 
     /* Card Data */
     scene.load.image('card_cd', 'assets/images/cards/common/edbc_ship_cd.png');
     scene.load.image('card_cd_cost_0', 'assets/images/cards/common/edbc_ship_cd_cost_0karma.png');
     scene.load.image('card_cd_cost_1up', 'assets/images/cards/common/edbc_ship_cd_cost_1karma_up.png');
     scene.load.image('card_cd_cost_1down', 'assets/images/cards/common/edbc_ship_cd_cost_1karma_down.png');
     scene.load.image('card_cd_cost_2', 'assets/images/cards/common/edbc_ship_cd_cost_2karma.png');
 
     /* Card Art */
     scene.load.image('sample_000', 'assets/images/cards/art/sample_000.png');
     scene.load.image('sample_001', 'assets/images/cards/art/sample_001.png');
 
     /* Bitmap Font */
     scene.load.bitmapFont('orbitron', 'assets/fonts/orbitron_0.png', 'assets/fonts/orbitron.fnt');
     scene.load.bitmapFont('orbitron_bold', 'assets/fonts/orbitron_bold_0.png', 'assets/fonts/orbitron_bold.fnt');
     scene.load.bitmapFont('eurostile', 'assets/fonts/eurostile_0.png', 'assets/fonts/eurostile.fnt');
     scene.load.bitmapFont('eurostile_bold', 'assets/fonts/eurostile_bold_0.png', 'assets/fonts/eurostile_bold.fnt');
}