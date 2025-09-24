// src/data/templates/modern.ts
// Generates an ATS-friendly resume PDF using pdf-lib and your helpers/styles.
// Installs required package: `npm install pdf-lib`
// Returns Uint8Array (pdf bytes). Callers can create a Blob with `new Blob([bytes], { type: 'application/pdf' })`
// or use `URL.createObjectURL` to preview.

import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';
import type { ResumeDataTypeZod } from '@/data/constants/types';
import {
    createSectionHeading,
    cursorController,
    drawParagraph,
    formatDate,
    toCamelCase,
} from '@/lib/pdfHelpers';

const A4 = { width: 595.28, height: 841.89 };
const margin = { x: 38, y: 34 };
const sizes = {
    main: 24,
    heading: 12,
    subheading: 10,
    paragraph: 10,
};
const lineHeight = 1.8;
const bullet = '\u2022';

/* --------------------------
   Main generator
   -------------------------- */
export async function modern(
    data: ResumeDataTypeZod,
    mode: 'light' | 'dark' = 'light'
): Promise<Uint8Array> {
    const pdf = await PDFDocument.create();
    let page = pdf.addPage([A4.width, A4.height]);

    const NormalFont = await pdf.embedFont(StandardFonts.Helvetica);
    const ItalicFont = await pdf.embedFont(StandardFonts.TimesRomanItalic);
    const BoldFont = await pdf.embedFont(StandardFonts.HelveticaBold);
    const BoldItalicFont = await pdf.embedFont(StandardFonts.HelveticaBoldOblique);
    const { width, height } = page.getSize();

    let trackerY = height - margin.y;

    page.drawText(data.name, {
        x: (width - NormalFont.widthOfTextAtSize(data.name, sizes.main)) / 2,
        y: trackerY,
        size: sizes.main,
        font: NormalFont,
    });

            [page, trackerY] = cursorController({
                currentY: trackerY,
                margin: margin.y,
                page: page,
                pdf: pdf,
                space: NormalFont.heightAtSize(sizes.heading) + lineHeight,
            });

    page.drawText(`${data.location} | ${data.email}  | ${data.phone}`, {
        x:
            (width -
                NormalFont.widthOfTextAtSize(
                    `${data.location} | ${data.email}  | ${data.phone}`,
                    sizes.paragraph
                )) /
            2,
        y: trackerY,
        size: sizes.paragraph,
        font: NormalFont,
        maxWidth: width - margin.x * 2,
    });

            [page, trackerY] = cursorController({
                currentY: trackerY,
                margin: margin.y,
                page: page,
                pdf: pdf,
                space: NormalFont.heightAtSize(sizes.heading) + lineHeight,
            });

    page.drawText(`${data.links[0].url} | ${data.links[1].url}  | ${data.links[2].url}`, {
        x:
            (width -
                NormalFont.widthOfTextAtSize(
                    `${data.links[0].url} | ${data.links[1].url}  | ${data.links[2].url}`,
                    sizes.paragraph
                )) /
            2,
        y: trackerY,
        size: sizes.paragraph,
        font: NormalFont,
        maxWidth: width - margin.x * 2,
    });

    [page, trackerY] = cursorController({
        currentY: trackerY,
        margin: margin.y,
        page: page,
        pdf: pdf,
        space: 12,
    });

    // Summary
    [page, trackerY] = createSectionHeading(
        trackerY,
        BoldFont,
        sizes.heading,
        page,
        margin.y,
        width,
        margin.x,
        'Summary',
        pdf
    );

    [page, trackerY] = drawParagraph(
        pdf,
        { cursorY: trackerY, page: page },
        data.summary || '',
        margin.x,
        { font: NormalFont, size: sizes.paragraph, color: rgb(0, 0, 0) },
        width - margin.x * 2,
        NormalFont.heightAtSize(sizes.paragraph) + lineHeight,
        margin.y
    );

    if (data.experience) {
        // Experiance
        [page, trackerY] = createSectionHeading(
            trackerY,
            BoldFont,
            sizes.heading,
            page,
            margin.y,
            width,
            margin.x,
            'Experiance',
            pdf
        );

        data.experience?.map((val) => {
            page.drawText(val.title, {
                x: margin.x,
                y: trackerY,
                size: sizes.subheading,
                maxWidth: width - margin.x * 2,
                lineHeight: sizes.subheading + lineHeight,
                font: BoldItalicFont,
            });
            page.drawText(val.location, {
                x: width - margin.x - ItalicFont.widthOfTextAtSize(val.location, sizes.paragraph),
                y: trackerY,
                font: ItalicFont,
                size: sizes.paragraph,
                maxWidth: width - margin.x * 2,
                lineHeight: sizes.paragraph + lineHeight,
            });

            [page, trackerY] = cursorController({
                currentY: trackerY,
                margin: margin.y,
                page: page,
                pdf: pdf,
                space: BoldItalicFont.heightAtSize(sizes.paragraph) + 2.8,
            });

            page.drawText(val.company, {
                x: margin.x,
                y: trackerY,
                size: sizes.paragraph,
                maxWidth: width - margin.x * 2,
                lineHeight: sizes.paragraph + lineHeight,
                font: ItalicFont,
            });

            val.startDate !== undefined &&
                page.drawText(
                    `${formatDate(val.startDate)}${val.endDate !== undefined ? ' - ' + formatDate(val.endDate) : ''}`,
                    {
                        x:
                            width -
                            margin.x -
                            ItalicFont.widthOfTextAtSize(
                                `${formatDate(val.startDate)}${val.endDate !== undefined ? ' - ' + formatDate(val.endDate) : ''}`,
                                sizes.paragraph
                            ),
                        y: trackerY,
                        font: ItalicFont,
                        size: sizes.paragraph,
                        maxWidth: width - margin.x * 2,
                        lineHeight: sizes.paragraph + lineHeight,
                    }
                );

            [page, trackerY] = cursorController({
                currentY: trackerY,
                margin: margin.y,
                page: page,
                pdf: pdf,
                space: ItalicFont.heightAtSize(sizes.paragraph) + lineHeight * 2,
            });

            [page, trackerY] = drawParagraph(
                pdf,
                { cursorY: trackerY, page: page },
                val.description || '',
                margin.x,
                { font: NormalFont, size: sizes.paragraph, color: rgb(0, 0, 0) },
                width - margin.x * 2,
                NormalFont.heightAtSize(sizes.paragraph) + lineHeight,
                margin.y
            );
        });
    }

    if (data.project) {
        // Project
        [page, trackerY] = createSectionHeading(
            trackerY,
            BoldFont,
            sizes.heading,
            page,
            margin.y,
            width,
            margin.x,
            'Project',
            pdf
        );

        data.project?.map((val) => {
            page.drawText(val.name, {
                x: margin.x,
                y: trackerY,
                size: sizes.subheading,
                maxWidth: width - margin.x * 2,
                lineHeight: sizes.subheading + lineHeight,
                font: BoldItalicFont,
            });

            page.drawText(toCamelCase(val.type), {
                x: width - margin.x - ItalicFont.widthOfTextAtSize(val.type, sizes.paragraph),
                y: trackerY,
                font: ItalicFont,
                size: sizes.paragraph,
                maxWidth: width - margin.x * 2,
                lineHeight: sizes.paragraph + lineHeight,
            });

            [page, trackerY] = cursorController({
                currentY: trackerY,
                margin: margin.y,
                page: page,
                pdf: pdf,
                space: BoldItalicFont.heightAtSize(sizes.subheading) + lineHeight,
            });

            val.code_link !== undefined && val.code_link !== "" &&
                page.drawText(
                    `${val.code_link}${val.preview_link !== undefined ? ' | ' + val.preview_link : ''}`,
                    {
                        x: margin.x,
                        y: trackerY,
                        size: sizes.paragraph,
                        maxWidth: width - margin.x * 2,
                        lineHeight: sizes.paragraph + lineHeight,
                        font: ItalicFont,
                    }
                );

            val.code_link !== undefined && val.code_link !== "" && ([page, trackerY] = cursorController({
                currentY: trackerY,
                margin: margin.y,
                page: page,
                pdf: pdf,
                space: ItalicFont.heightAtSize(sizes.paragraph) + lineHeight,
            }));

            [page, trackerY] = drawParagraph(
                pdf,
                { cursorY: trackerY, page: page },
                val.description + '\n- Tech Stack: ' + val.tech_stack.join(', ') || '',
                margin.x,
                { font: NormalFont, size: sizes.paragraph, color: rgb(0, 0, 0) },
                width - margin.x * 2,
                NormalFont.heightAtSize(sizes.paragraph) + lineHeight,
                margin.y
            );
        });
    }

    if (data.education) {
        // Education
        [page, trackerY] = createSectionHeading(
            trackerY,
            BoldFont,
            sizes.heading,
            page,
            margin.y,
            width,
            margin.x,
            'Education',
            pdf
        );

        data.education.map((val) => {
            page.drawText(val.institute, {
                x: margin.x,
                y: trackerY,
                size: sizes.subheading,
                maxWidth: width - margin.x * 2,
                lineHeight: sizes.subheading + lineHeight,
                font: BoldItalicFont,
            });
            page.drawText(val.location, {
                x: width - margin.x - ItalicFont.widthOfTextAtSize(val.location, sizes.paragraph),
                y: trackerY,
                font: ItalicFont,
                size: sizes.paragraph,
                maxWidth: width - margin.x * 2,
                lineHeight: sizes.paragraph + lineHeight,
            });
            [page, trackerY] = cursorController({
                currentY: trackerY,
                margin: margin.y,
                page: page,
                pdf: pdf,
                space: BoldItalicFont.heightAtSize(sizes.subheading) + lineHeight,
            });

            page.drawText(val.course, {
                x: margin.x,
                y: trackerY,
                size: sizes.paragraph,
                maxWidth: width - margin.x * 2,
                lineHeight: sizes.paragraph + lineHeight,
                font: ItalicFont,
            });
            page.drawText(
                `${formatDate(val.startDate)}${val.endDate ? ' - ' + formatDate(val.endDate) : ''}`,
                {
                    x:
                        width -
                        margin.x -
                        ItalicFont.widthOfTextAtSize(
                            `${formatDate(val.startDate)}${val.endDate ? ' - ' + formatDate(val.endDate) : ''}`,
                            sizes.paragraph
                        ),
                    y: trackerY,
                    font: ItalicFont,
                    size: sizes.paragraph,
                    maxWidth: width - margin.x * 2,
                    lineHeight: sizes.paragraph + lineHeight,
                }
            );

            [page, trackerY] = cursorController({
                currentY: trackerY,
                margin: margin.y,
                page: page,
                pdf: pdf,
                space: ItalicFont.heightAtSize(sizes.paragraph) + lineHeight,
            });

            val.description !== undefined &&
                ([page, trackerY] = drawParagraph(
                    pdf,
                    { cursorY: trackerY, page: page },
                    `${bullet} ${val.description}` || '',
                    margin.x,
                    { font: NormalFont, size: sizes.paragraph, color: rgb(0, 0, 0) },
                    width - margin.x * 2,
                    NormalFont.heightAtSize(sizes.paragraph) + lineHeight,
                    margin.y
                ));
        });
    }

    if (data.achievement) {
        // Education
        [page, trackerY] = createSectionHeading(
            trackerY,
            BoldItalicFont,
            sizes.heading,
            page,
            margin.y,
            width,
            margin.x,
            'Achievement',
            pdf
        );

        data.achievement.map((val) => {
            page.drawText(val.name, {
                x: margin.x,
                y: trackerY,
                size: sizes.subheading,
                maxWidth: width - margin.x * 2,
                lineHeight: sizes.subheading + lineHeight,
                font: BoldItalicFont,
            });

            val.date !== undefined &&
                page.drawText(formatDate(val.date || ''), {
                    x:
                        width -
                        margin.x -
                        ItalicFont.widthOfTextAtSize(formatDate(val.date || ''), sizes.paragraph),
                    y: trackerY,
                    font: ItalicFont,
                    size: sizes.paragraph,
                    maxWidth: width - margin.x * 2,
                    lineHeight: sizes.paragraph + lineHeight,
                });

            [page, trackerY] = cursorController({
                currentY: trackerY,
                margin: margin.y,
                page: page,
                pdf: pdf,
                space: BoldItalicFont.heightAtSize(sizes.subheading) + lineHeight,
            });

            page.drawText(val.issuer, {
                x: margin.x,
                y: trackerY,
                size: sizes.paragraph,
                maxWidth: width - margin.x * 2,
                lineHeight: sizes.paragraph + lineHeight,
                font: ItalicFont,
            });
            page.drawText(toCamelCase(val.type), {
                x: width - margin.x - ItalicFont.widthOfTextAtSize(val.type, sizes.paragraph),
                y: trackerY,
                font: ItalicFont,
                size: sizes.paragraph,
                maxWidth: width - margin.x * 2,
                lineHeight: sizes.paragraph + lineHeight,
            });
            [page, trackerY] = cursorController({
                currentY: trackerY,
                margin: margin.y,
                page: page,
                pdf: pdf,
                space: ItalicFont.heightAtSize(sizes.paragraph) + lineHeight,
            });

            [page, trackerY] = drawParagraph(
                pdf,
                { cursorY: trackerY, page: page },
                `${bullet} ${val.description}` || '',
                margin.x,
                { font: NormalFont, size: sizes.paragraph, color: rgb(0, 0, 0) },
                width - margin.x * 2,
                NormalFont.heightAtSize(sizes.paragraph) + lineHeight,
                margin.y
            );
        });
    }

    if (data.language) {
        // Education
        [page, trackerY] = createSectionHeading(
            trackerY,
            BoldFont,
            sizes.heading,
            page,
            margin.y,
            width,
            margin.x,
            'Language',
            pdf
        );

        data.language.map((val) => {
            page.drawText(`${bullet} ${val.language} (${toCamelCase(val.proficiency)})`, {
                x: margin.x,
                y: trackerY,
                size: sizes.subheading,
                maxWidth: width - margin.x * 2,
                lineHeight: sizes.subheading + lineHeight,
                font: NormalFont,
            });

            [page, trackerY] = cursorController({
                currentY: trackerY,
                margin: margin.y,
                page: page,
                pdf: pdf,
                space: NormalFont.heightAtSize(sizes.subheading) + lineHeight,
            });
        });
    }

    // finalize
    const pdfBytes = await pdf.save();
    return pdfBytes; // Uint8Array
}

export default modern;
