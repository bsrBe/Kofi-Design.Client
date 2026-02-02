import bustDistanceImg from '../assets/gallery/photo_2026-02-02_09-49-13.jpg';
import shoulderToBustImg from '../assets/gallery/photo_2026-02-02_09-49-38.jpg';
import neckDepthImg from '../assets/gallery/photo_2026-02-02_09-49-42.jpg';
import neckCircImg from '../assets/gallery/photo_2026-02-02_09-49-45.jpg';
import chestFrontImg from '../assets/gallery/photo_2026-02-02_09-49-56.jpg';
import shoulderWidthImg from '../assets/gallery/photo_2026-02-02_09-50-07.jpg';
import backLengthImg from '../assets/gallery/photo_2026-02-02_09-50-11.jpg';
import frontLengthImg from '../assets/gallery/photo_2026-02-02_09-50-14.jpg';
import shoulderWaistFrontImg from '../assets/gallery/photo_2026-02-02_09-50-21.jpg';
import skirtLengthImg from '../assets/gallery/photo_2026-02-02_09-50-28.jpg';
import dressLengthImg from '../assets/gallery/photo_2026-02-02_09-50-32.jpg';
import sleeveLengthImg from '../assets/gallery/photo_2026-02-02_09-50-36.jpg';
import bicepImg from '../assets/gallery/photo_2026-02-02_09-50-39.jpg';
import armholeCircImg from '../assets/gallery/photo_2026-02-02_09-50-44.jpg';
import fullHipImg from '../assets/gallery/photo_2026-02-02_09-51-06.jpg';
import highHipImg from '../assets/gallery/photo_2026-02-02_09-51-09.jpg';
import genericGuide from '../assets/gallery/masterpiece_1.png';

export interface MeasurementField {
    key: string;
    label: string;
    sub: string;
    guide: string;
    image: string;
}

export interface MeasurementSection {
    section: string;
    fields: MeasurementField[];
}

export const MEASUREMENT_SCHEMES: Record<string, MeasurementSection[]> = {
    top: [
        {
            section: "Body Circumference",
            fields: [
                { key: 'fullBust', label: 'Full Bust', sub: 'Widest part', guide: 'Measure around the fullest part of your bust.', image: chestFrontImg },
                { key: 'highBust', label: 'High Bust', sub: 'Above the bust', guide: 'Measure around your chest, above the bust line and under the armpins.', image: chestFrontImg },
                { key: 'naturalWaist', label: 'Natural Waist', sub: 'Narrowest point', guide: 'Measure around your natural waistline, the narrowest part of your torso.', image: highHipImg },
                { key: 'fullHip', label: 'Full Hip', sub: 'Widest part of buttocks', guide: 'Measure around the fullest part of your hips and buttocks.', image: fullHipImg },
            ]
        },
        {
            section: "Shoulder & Length",
            fields: [
                { key: 'shoulderWidth', label: 'Shoulder Width', sub: 'Seam to seam', guide: 'Measure across the back from one shoulder point to the other.', image: shoulderWidthImg },
                { key: 'topLength', label: 'Top Length', sub: 'Shoulder to desired length', guide: 'Measure from the shoulder point down to where you want the top to end.', image: frontLengthImg },
            ]
        }
    ],
    dress: [
        {
            section: "Body Circumference",
            fields: [
                { key: 'highBust', label: 'High Bust', sub: 'Above the bust', guide: 'Measure around your chest, above the bust line and under the armpins.', image: chestFrontImg },
                { key: 'fullBust', label: 'Full Bust', sub: 'Widest part', guide: 'Measure around the fullest part of your bust.', image: chestFrontImg },
                { key: 'underBust', label: 'Under-Bust', sub: 'Below the bust', guide: 'Measure around your ribcage, just under your bust.', image: chestFrontImg },
                { key: 'naturalWaist', label: 'Natural Waist', sub: 'Narrowest point', guide: 'Measure around your natural waistline, the narrowest part of your torso.', image: highHipImg },
                { key: 'highHip', label: 'High Hip', sub: 'Hip bone level', guide: 'Measure around your torso at the level of your hip bones.', image: highHipImg },
                { key: 'fullHip', label: 'Full Hip', sub: 'Widest part of buttocks', guide: 'Measure around the fullest part of your hips and buttocks.', image: fullHipImg },
            ]
        },
        {
            section: "Front & Back Balance",
            fields: [
                { key: 'shoulderToBustPoint', label: 'Shoulder to Bust Point', sub: 'Shoulder to point', guide: 'Measure from the shoulder base down to your bust point.', image: shoulderToBustImg },
                { key: 'shoulderToUnderBust', label: 'Shoulder to Under Bust', sub: 'Shoulder to under bust', guide: 'Measure from the shoulder base down to just under the bust.', image: shoulderToBustImg },
                { key: 'bustToBust', label: 'Bust to Bust', sub: 'Point to point', guide: 'Measure the distance between your two bust points.', image: bustDistanceImg },
                { key: 'frontLength', label: 'Front Length', sub: 'Shoulder to waist', guide: 'Measure from the shoulder base, over the bust, to the natural waist.', image: frontLengthImg },
                { key: 'backLength', label: 'Back Length', sub: 'Neck to waist', guide: 'Measure from the base of the neck bone to the natural waist.', image: backLengthImg },
                { key: 'shoulderToWaistSide', label: 'Shoulder to Waist (Side)', sub: 'Side measurement', guide: 'Measure from the shoulder point to the side waist.', image: shoulderWaistFrontImg },
            ]
        },
        {
            section: "Lengths",
            fields: [
                { key: 'waistToHip', label: 'Waist to Hip', sub: 'Waist to widest hip', guide: 'Measure from the waistline to the fullest part of the hip.', image: dressLengthImg },
                { key: 'waistToKnee', label: 'Waist to Knee', sub: 'Waist to knee', guide: 'Measure from the waistline down to the level of the knee.', image: dressLengthImg },
                { key: 'waistToCalf', label: 'Waist to Calf', sub: 'Waist to calf', guide: 'Measure from the waistline down to the fullest part of the calf.', image: dressLengthImg },
                { key: 'waistToFloor', label: 'Waist to Floor', sub: 'Waist to floor', guide: 'Measure from the waistline down to the floor.', image: dressLengthImg },
                { key: 'fullDressLength', label: 'Full Dress Length', sub: 'Shoulder to floor', guide: 'Measure from the shoulder point down to the floor/desired hem.', image: dressLengthImg },
            ]
        },
        {
            section: "Shoulder, Neck & Armhole",
            fields: [
                { key: 'shoulderWidth', label: 'Shoulder Width', sub: 'Seam to seam', guide: 'Measure across the back from one shoulder point to the other.', image: shoulderWidthImg },
                { key: 'neckCirc', label: 'Neck Circumference', sub: 'Around neck', guide: 'Measure around the base of your neck.', image: neckCircImg },
                { key: 'neckWidth', label: 'Neck Width', sub: 'Width of neck opening', guide: 'Measure the horizontal width of your neck opening.', image: neckDepthImg },
                { key: 'neckDepthFront', label: 'Neck Depth (Front)', sub: 'Front neck drop', guide: 'Measure vertically from the shoulder line to the desired front depth.', image: neckDepthImg },
                { key: 'armholeDepth', label: 'Armhole Depth', sub: 'Shoulder to underarm', guide: 'Measure vertically from the shoulder point to the underarm level.', image: armholeCircImg },
                { key: 'armholeCirc', label: 'Armhole Circumference', sub: 'Around armhole', guide: 'Measure around the shoulder and underarm in a loop.', image: armholeCircImg },
            ]
        },
        {
            section: "Sleeves (Optional)",
            fields: [
                { key: 'sleeveLength', label: 'Sleeve Length', sub: 'Shoulder to wrist', guide: 'Measure from the shoulder point down to the wrist bone.', image: sleeveLengthImg },
                { key: 'upperArm', label: 'Upper Arm (Bicep)', sub: 'Widest part of arm', guide: 'Measure around the fullest part of your upper arm.', image: bicepImg },
                { key: 'elbow', label: 'Elbow', sub: 'Around elbow', guide: 'Measure around your elbow joint (slightly bent).', image: sleeveLengthImg },
                { key: 'wristCirc', label: 'Wrist Circumference', sub: 'Around wrist', guide: 'Measure around your wrist bone.', image: sleeveLengthImg },
            ]
        }
    ],
    pants: [
        {
            section: "Waist & Hips",
            fields: [
                { key: 'waist', label: 'Waist', sub: 'Natural waistline', guide: 'Measure around your natural waistline.', image: highHipImg },
                { key: 'highHip', label: 'High Hip', sub: 'Hip bone level', guide: 'Measure around the level of your hip bones.', image: highHipImg },
                { key: 'fullHip', label: 'Full Hip', sub: 'Widest part', guide: 'Measure around the fullest part of your hips.', image: fullHipImg },
            ]
        },
        {
            section: "Rise & Length",
            fields: [
                { key: 'crotchDepth', label: 'Crotch Depth', sub: 'Waist to chair (sitting)', guide: 'Measure from the waist to the chair surface while sitting.', image: dressLengthImg },
                { key: 'crotchLength', label: 'Crotch Length', sub: 'Waist (front) to waist (back)', guide: 'Measure from the front waist, under the crotch, to the back waist.', image: dressLengthImg },
                { key: 'inseam', label: 'Inseam', sub: 'Crotch to ankle', guide: 'Measure from the crotch down the inside of the leg to the ankle.', image: skirtLengthImg },
                { key: 'outseam', label: 'Outseam', sub: 'Waist to ankle', guide: 'Measure from the waist down the outside of the leg to the ankle.', image: skirtLengthImg },
            ]
        },
        {
            section: "Leg Circumference",
            fields: [
                { key: 'thigh', label: 'Thigh', sub: 'Widest part', guide: 'Measure around the fullest part of your upper thigh.', image: skirtLengthImg },
                { key: 'knee', label: 'Knee', sub: 'Around knee', guide: 'Measure around your knee point.', image: skirtLengthImg },
                { key: 'calf', label: 'Calf', sub: 'Around calf', guide: 'Measure around the fullest part of your calf.', image: skirtLengthImg },
                { key: 'ankleOpening', label: 'Ankle Opening', sub: 'Desired width', guide: 'Measure around your ankle or the desired width of the leg opening.', image: skirtLengthImg },
            ]
        }
    ],
    jacket: [
        {
            section: "Body Circumference",
            fields: [
                { key: 'chest', label: 'Chest', sub: 'Fullest part', guide: 'Measure around the fullest part of your chest.', image: chestFrontImg },
                { key: 'waist', label: 'Waist', sub: 'At navel level', guide: 'Measure around your waist at the level of your navel.', image: highHipImg },
                { key: 'hips', label: 'Hips', sub: 'Widest part', guide: 'Measure around the fullest part of your hips.', image: fullHipImg },
            ]
        },
        {
            section: "Shoulder & Length",
            fields: [
                { key: 'shoulderWidth', label: 'Shoulder Width', sub: 'Across back', guide: 'Measure across the back from shoulder point to shoulder point.', image: shoulderWidthImg },
                { key: 'shoulderSlope', label: 'Shoulder Slope', sub: 'Angle', guide: 'Measure the angle of your shoulder from the neck base.', image: genericGuide },
                { key: 'jacketLength', label: 'Jacket Length', sub: 'Shoulder to desired hem', guide: 'Measure from the shoulder point down to the desired jacket length.', image: frontLengthImg },
                { key: 'backLength', label: 'Back Length', sub: 'Neck to waist', guide: 'Measure from the base of the neck to the waistline.', image: backLengthImg },
            ]
        },
        {
            section: "Sleeves",
            fields: [
                { key: 'sleeveLength', label: 'Sleeve Length', sub: 'Shoulder to wrist', guide: 'Measure from shoulder point to the wrist bone.', image: sleeveLengthImg },
                { key: 'bicep', label: 'Bicep', sub: 'Around upper arm', guide: 'Measure around the fullest part of your bicep.', image: bicepImg },
                { key: 'wrist', label: 'Wrist', sub: 'Around wrist', guide: 'Measure around your wrist bone.', image: sleeveLengthImg },
            ]
        }
    ]
};
