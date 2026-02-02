import bustDistanceImg from '../assets/gallery/photo_2026-02-02_09-49-13.jpg';
import shoulderToBustImg from '../assets/gallery/photo_2026-02-02_09-49-38.jpg';
import neckOpenImg from '../assets/gallery/photo_2026-02-02_09-49-42.jpg';
import neckImg from '../assets/gallery/photo_2026-02-02_09-49-45.jpg';
import chestFrontImg from '../assets/gallery/photo_2026-02-02_09-49-56.jpg';
import chestBackImg from '../assets/gallery/photo_2026-02-02_09-50-01.jpg';
import waistImg from '../assets/gallery/photo_2026-02-02_09-50-04.jpg';
import waistToHipImg from '../assets/gallery/photo_2026-02-02_09-50-07.jpg';
import hipImg from '../assets/gallery/photo_2026-02-02_09-50-11.jpg';
import crotchLengthImg from '../assets/gallery/photo_2026-02-02_09-50-14.jpg';
import crotchDepthImg from '../assets/gallery/photo_2026-02-02_09-50-18.jpg';
import waistToFloorImg from '../assets/gallery/photo_2026-02-02_09-50-21.jpg';
import outseamImg from '../assets/gallery/photo_2026-02-02_09-50-28.jpg';
import thighImg from '../assets/gallery/photo_2026-02-02_09-50-32.jpg';
import kneeImg from '../assets/gallery/photo_2026-02-02_09-50-36.jpg';
import calfImg from '../assets/gallery/photo_2026-02-02_09-50-39.jpg';
import ankleImg from '../assets/gallery/photo_2026-02-02_09-50-44.jpg';
import shoulderWidthImg from '../assets/gallery/photo_2026-02-02_09-50-50.jpg';
import armholeCircImg from '../assets/gallery/photo_2026-02-02_09-50-58.jpg';
import sleeveLengthImg from '../assets/gallery/photo_2026-02-02_09-51-03.jpg';
import bicepImg from '../assets/gallery/photo_2026-02-02_09-51-06.jpg';
import wristImg from '../assets/gallery/photo_2026-02-02_09-51-09.jpg';

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
                { key: 'highBust', label: 'High Bust', sub: 'Above the bust', guide: 'Measure around your chest above your bust line.', image: chestFrontImg },
                { key: 'fullBust', label: 'Full Bust', sub: 'Widest part', guide: 'Measure around the fullest part of your bust.', image: chestFrontImg },
                { key: 'underBust', label: 'Under-Bust', sub: 'Below the bust', guide: 'Measure around your ribs just under your bust.', image: chestFrontImg },
                { key: 'waist', label: 'Waist', sub: 'Natural waistline', guide: 'Measure around your natural waistline.', image: waistImg },
            ]
        },
        {
            section: "Length & Balance",
            fields: [
                { key: 'bustDistance', label: 'Bust Distance', sub: 'Point to point', guide: 'Measure from one bust point to the other.', image: bustDistanceImg },
                { key: 'frontLength', label: 'Front Length', sub: 'Shoulder to waist', guide: 'Measure from shoulder to your natural waist.', image: shoulderToBustImg },
                { key: 'shoulderToBust', label: 'Shoulder to Bust', sub: 'Shoulder to point', guide: 'Measure from shoulder to bust point.', image: shoulderToBustImg },
                { key: 'shoulderToUnderBust', label: 'Shoulder to Under Bust', sub: 'Shoulder to under bust', guide: 'Measure from shoulder to just under your bust.', image: shoulderToBustImg },
                { key: 'backLength', label: 'Back Length', sub: 'Neck to waist', guide: 'Measure from the neck bone to your natural waist.', image: chestBackImg },
                { key: 'topLength', label: 'Top Length', sub: 'Shoulder to hem', guide: 'Total length of the top.', image: shoulderToBustImg },
            ]
        },
        {
            section: "Shoulder & Armhole",
            fields: [
                { key: 'shoulderWidth', label: 'Shoulder Width', sub: 'Seam to seam', guide: 'Measure across the back from shoulder bone to shoulder bone.', image: shoulderWidthImg },
                { key: 'neckCirc', label: 'Neck Circumference', sub: 'Around neck', guide: 'Measure around the base of your neck.', image: neckImg },
                { key: 'armholeDepth', label: 'Armhole Depth', sub: 'Shoulder to underarm', guide: 'Measure vertically from shoulder to underarm.', image: armholeCircImg },
                { key: 'armholeCirc', label: 'Armhole Circumference', sub: 'Around armhole', guide: 'Measure around the shoulder and underarm.', image: armholeCircImg },
            ]
        },
        {
            section: "Sleeves (Optional)",
            fields: [
                { key: 'sleeveLength', label: 'Sleeve Length', sub: 'Shoulder to wrist', guide: 'Measure from shoulder tip to wrist.', image: sleeveLengthImg },
                { key: 'upperArm', label: 'Upper Arm (Bicep)', sub: 'Widest part of arm', guide: 'Measure around the fullest part of your upper arm.', image: bicepImg },
                { key: 'elbow', label: 'Elbow', sub: 'Around elbow', guide: 'Measure around your elbow.', image: wristImg },
                { key: 'wristCirc', label: 'Wrist Circumference', sub: 'Around wrist', guide: 'Measure around your wrist bone.', image: wristImg },
            ]
        }
    ],
    dress: [
        {
            section: "Body Circumference",
            fields: [
                { key: 'highBust', label: 'High Bust', sub: 'Above the bust', guide: 'Measure around your chest above your bust line.', image: chestFrontImg },
                { key: 'fullBust', label: 'Full Bust', sub: 'Widest part', guide: 'Measure around the fullest part of your bust.', image: chestFrontImg },
                { key: 'underBust', label: 'Under-Bust', sub: 'Below the bust', guide: 'Measure around your ribs just under your bust.', image: chestFrontImg },
                { key: 'naturalWaist', label: 'Natural Waist', sub: 'Narrowest point', guide: 'Measure around your natural waistline.', image: waistImg },
                { key: 'highHip', label: 'High Hip', sub: 'Hip bone level', guide: 'Measure around your upper hip area.', image: hipImg },
                { key: 'fullHip', label: 'Full Hip', sub: 'Widest part of buttocks', guide: 'Measure around the fullest part of your hips.', image: hipImg },
            ]
        },
        {
            section: "Front & Back Balance",
            fields: [
                { key: 'shoulderToBustPoint', label: 'Shoulder to Bust Point', sub: 'Shoulder to point', guide: 'Measure from shoulder to bust point.', image: shoulderToBustImg },
                { key: 'shoulderToUnderBust', label: 'Shoulder to Under Bust', sub: 'Shoulder to under bust', guide: 'Measure from shoulder to just under your bust.', image: shoulderToBustImg },
                { key: 'bustToBust', label: 'Bust to Bust', sub: 'Point to point', guide: 'Measure from one bust point to the other.', image: bustDistanceImg },
                { key: 'frontLength', label: 'Front Length', sub: 'Shoulder to waist', guide: 'Measure from shoulder to natural waist.', image: shoulderToBustImg },
                { key: 'backLength', label: 'Back Length', sub: 'Neck to waist', guide: 'Measure from neck bone to natural waist.', image: chestBackImg },
                { key: 'shoulderToWaistSide', label: 'Shoulder to Waist (Side)', sub: 'Side measurement', guide: 'Measure from shoulder to waist along the side.', image: shoulderToBustImg },
            ]
        },
        {
            section: "Lengths",
            fields: [
                { key: 'waistToHip', label: 'Waist to Hip', sub: 'Waist to widest hip', guide: 'Measure from waist to the fullest part of hip.', image: waistToHipImg },
                { key: 'waistToKnee', label: 'Waist to Knee', sub: 'Waist to knee', guide: 'Measure from waist down to the knee.', image: waistToFloorImg },
                { key: 'waistToCalf', label: 'Waist to Calf', sub: 'Waist to calf', guide: 'Measure from waist down to the calf.', image: waistToFloorImg },
                { key: 'waistToFloor', label: 'Waist to Floor', sub: 'Waist to floor', guide: 'Measure from waist down to the floor.', image: waistToFloorImg },
                { key: 'fullDressLength', label: 'Full Dress Length', sub: 'Shoulder to floor', guide: 'Total length from shoulder to floor.', image: waistToFloorImg },
            ]
        },
        {
            section: "Shoulder, Neck & Armhole",
            fields: [
                { key: 'shoulderWidth', label: 'Shoulder Width', sub: 'Seam to seam', guide: 'Measure across the back from shoulder bone to shoulder bone.', image: shoulderWidthImg },
                { key: 'neckCirc', label: 'Neck Circumference', sub: 'Around neck', guide: 'Measure around the base of your neck.', image: neckImg },
                { key: 'neckWidth', label: 'Neck Width', sub: 'Width of neck opening', guide: 'Measure the width of the neck opening from side to side.', image: neckOpenImg },
                { key: 'neckDepthFront', label: 'Neck Depth (Front)', sub: 'Front neck drop', guide: 'Measure from neck base to the center front depth.', image: neckOpenImg },
                { key: 'armholeDepth', label: 'Armhole Depth', sub: 'Shoulder to underarm', guide: 'Measure vertically from shoulder to underarm.', image: armholeCircImg },
                { key: 'armholeCirc', label: 'Armhole Circumference', sub: 'Around armhole', guide: 'Measure around the shoulder and underarm.', image: armholeCircImg },
            ]
        },
        {
            section: "Sleeves (Optional)",
            fields: [
                { key: 'sleeveLength', label: 'Sleeve Length', sub: 'Shoulder to wrist', guide: 'Measure from shoulder tip to wrist.', image: sleeveLengthImg },
                { key: 'upperArm', label: 'Upper Arm (Bicep)', sub: 'Widest part of arm', guide: 'Measure around the fullest part of your upper arm.', image: bicepImg },
                { key: 'elbow', label: 'Elbow', sub: 'Around elbow', guide: 'Measure around your elbow.', image: wristImg },
                { key: 'wristCirc', label: 'Wrist Circumference', sub: 'Around wrist', guide: 'Measure around your wrist bone.', image: wristImg },
            ]
        }
    ],
    pants: [
        {
            section: "Body Circumference",
            fields: [
                { key: 'waist', label: 'Waist', sub: 'Natural waistline', guide: 'Measure around your natural waistline.', image: waistImg },
                { key: 'highHip', label: 'High Hip', sub: 'Hip bone level', guide: 'Measure around your upper hip area.', image: hipImg },
                { key: 'fullHip', label: 'Full Hip', sub: 'Widest part of buttocks', guide: 'Measure around the fullest part of your hips.', image: hipImg },
            ]
        },
        {
            section: "Rise & Balance",
            fields: [
                { key: 'crotchDepth', label: 'Crotch Depth (Sitting)', sub: 'Waist to chair', guide: 'Sit on a flat surface and measure from waist to the seat.', image: crotchDepthImg },
                { key: 'crotchLength', label: 'Crotch Length', sub: 'Front to back', guide: 'Measure from front waist through legs to back waist.', image: crotchLengthImg },
            ]
        },
        {
            section: "Lengths",
            fields: [
                { key: 'inseam', label: 'Inseam', sub: 'Crotch to floor', guide: 'Measure from the crotch down to the floor.', image: outseamImg },
                { key: 'outseam', label: 'Outseam', sub: 'Waist to floor', guide: 'Measure from the waist down to the floor.', image: outseamImg },
            ]
        },
        {
            section: "Leg Measurements",
            fields: [
                { key: 'thigh', label: 'Thigh', sub: 'Widest part of thigh', guide: 'Measure around the fullest part of your thigh.', image: thighImg },
                { key: 'knee', label: 'Knee', sub: 'Around knee', guide: 'Measure around your knee.', image: kneeImg },
                { key: 'calf', label: 'Calf', sub: 'Around calf', guide: 'Measure around your calf.', image: calfImg },
                { key: 'ankleOpening', label: 'Ankle Opening', sub: 'Around ankle', guide: 'Measure around your ankle.', image: ankleImg },
            ]
        }
    ],
    jacket: [
        {
            section: "Body Circumference",
            fields: [
                { key: 'highBust', label: 'High Bust', sub: 'Above the bust', guide: 'Measure around your chest above your bust line.', image: chestFrontImg },
                { key: 'fullBust', label: 'Full Bust', sub: 'Widest part', guide: 'Measure around the fullest part of your bust.', image: chestFrontImg },
                { key: 'underBust', label: 'Under-Bust', sub: 'Below the bust', guide: 'Measure around your ribs just under your bust.', image: chestFrontImg },
                { key: 'waist', label: 'Waist', sub: 'Natural waistline', guide: 'Measure around your natural waistline.', image: waistImg },
            ]
        },
        {
            section: "Length & Balance",
            fields: [
                { key: 'frontLength', label: 'Front Length', sub: 'Shoulder to waist', guide: 'Measure from shoulder to natural waist.', image: shoulderToBustImg },
                { key: 'backLength', label: 'Back Length', sub: 'Neck to waist', guide: 'Measure from neck bone to natural waist.', image: chestBackImg },
                { key: 'jacketLength', label: 'Jacket Length', sub: 'Shoulder to hem', guide: 'Total length of the jacket.', image: shoulderToBustImg },
            ]
        },
        {
            section: "Shoulder & Armhole",
            fields: [
                { key: 'shoulderWidth', label: 'Shoulder Width', sub: 'Seam to seam', guide: 'Measure across the back from shoulder bone to shoulder bone.', image: shoulderWidthImg },
                { key: 'shoulderSlope', label: 'Shoulder Slope', sub: 'Shoulder angle', guide: 'Measure the angle of your shoulder.', image: shoulderWidthImg },
                { key: 'neckCirc', label: 'Neck Circumference', sub: 'Around neck', guide: 'Measure around the base of your neck.', image: neckImg },
                { key: 'armholeDepth', label: 'Armhole Depth', sub: 'Shoulder to underarm', guide: 'Measure vertically from shoulder to underarm.', image: armholeCircImg },
            ]
        },
        {
            section: "Sleeves",
            fields: [
                { key: 'sleeveLength', label: 'Sleeve Length', sub: 'Shoulder to wrist', guide: 'Measure from shoulder tip to wrist.', image: sleeveLengthImg },
                { key: 'upperArm', label: 'Upper Arm', sub: 'Widest part', guide: 'Measure around the fullest part of your upper arm.', image: bicepImg },
                { key: 'elbow', label: 'Elbow', sub: 'Around elbow', guide: 'Measure around your elbow.', image: wristImg },
                { key: 'wrist', label: 'Wrist', sub: 'Around wrist', guide: 'Measure around your wrist.', image: wristImg },
            ]
        }
    ]
};
