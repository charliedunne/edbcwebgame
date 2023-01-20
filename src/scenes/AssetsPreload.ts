import Phaser from 'phaser';

export function edbc_preload(scene: Phaser.Scene) {

     /* Board */
     scene.load.image('background', 'assets/images/board/edbc_board_bg.png');
     scene.load.image('areas_layer', 'assets/images/board/edbc_board_layout.png');

     /* Card Back */
     scene.load.image('card_back', 'assets/images/cards/common/edbc_frame_back.png');

     /* Frames */
     scene.load.image('drained_a', 'assets/images/cards/frames/edbc_frame_drained_a.png')
     scene.load.image('drained_b', 'assets/images/cards/frames/edbc_frame_drained_b.png')

     /* Ship Card Backgrounds */
     scene.load.image('bg_ship_alliance', 'assets/images/cards/common/edbc_ship_card_bg__alliance.png');
     scene.load.image('bg_ship_empire', 'assets/images/cards/common/edbc_ship_card_bg__empire.png');
     scene.load.image('bg_ship_federation', 'assets/images/cards/common/edbc_ship_card_bg__federation.png');
     scene.load.image('bg_ship_neutral', 'assets/images/cards/common/edbc_ship_card_bg__neutral.png');
     scene.load.image('bg_ship_none', 'assets/images/cards/common/edbc_ship_card_bg__none.png');

     /* Action Card Backgrounds */
     scene.load.image('bg_action_alliance', 'assets/images/cards/common/edbc_action_card_bg__alliance.png');
     scene.load.image('bg_action_empire', 'assets/images/cards/common/edbc_action_card_bg__empire.png');
     scene.load.image('bg_action_federation', 'assets/images/cards/common/edbc_action_card_bg__federation.png');
     scene.load.image('bg_action_neutral', 'assets/images/cards/common/edbc_action_card_bg__neutral.png');
     //scene.load.image('bg_action_none', 'assets/images/cards/common/edbc_action_card_bg__none.png');

     /* Outfitting Card Background */
     scene.load.image('bg_outfitting', 'assets/images/cards/common/edbc_outfitting_card_bg.png');
 
     /* Card Data */
     scene.load.image('card_cd', 'assets/images/cards/common/edbc_ship_cd.png');
     scene.load.image('card_cd_cost_0', 'assets/images/cards/common/edbc_ship_cd_cost_0karma.png');
     scene.load.image('card_cd_cost_1up', 'assets/images/cards/common/edbc_ship_cd_cost_1karma_up.png');
     scene.load.image('card_cd_cost_1', 'assets/images/cards/common/edbc_ship_cd_cost_1karma_down.png');
     scene.load.image('card_cd_cost_2', 'assets/images/cards/common/edbc_ship_cd_cost_2karma.png');
 
     /* Card Art */
     scene.load.image('sample_000', 'assets/images/cards/art/sample_000.png');
     scene.load.image('sample_001', 'assets/images/cards/art/sample_001.png');
 
     /* Bitmap Font */
     scene.load.bitmapFont('orbitron', 'assets/fonts/orbitron_0.png', 'assets/fonts/orbitron.fnt');
     scene.load.bitmapFont('orbitron_bold', 'assets/fonts/orbitron_bold_0.png', 'assets/fonts/orbitron_bold.fnt');
     scene.load.bitmapFont('eurostile', 'assets/fonts/eurostile_0.png', 'assets/fonts/eurostile.fnt');
     scene.load.bitmapFont('eurostile_bold', 'assets/fonts/eurostile_bold_0.png', 'assets/fonts/eurostile_bold.fnt');

     /* Icons */
     scene.load.image('coriolis', 'assets/images/cards/common/edbc_ico_coriolis.png');
     scene.load.image('outpost', 'assets/images/cards/common/edbc_ico_outpost.png');
     scene.load.image('orbis', 'assets/images/cards/common/edbc_ico_orbis.png');
     scene.load.image('ocellus', 'assets/images/cards/common/edbc_ico_ocellus.png');
     scene.load.image('megaship', 'assets/images/cards/common/edbc_ico_megaship.png');
     scene.load.image('asteroids', 'assets/images/cards/common/edbc_ico_asteroids.png');
     scene.load.image('federation', 'assets/images/cards/common/edbc_ico_federation_s.png');
     scene.load.image('empire', 'assets/images/cards/common/edbc_ico_empire_s.png');
     scene.load.image('alliance', 'assets/images/cards/common/edbc_ico_alliance_s.png');
     scene.load.image('neutral', 'assets/images/cards/common/edbc_ico_neutral_s.png');

     /* Art */
     scene.load.image('no_image', 'assets/images/cards/art/no_image.png');

}