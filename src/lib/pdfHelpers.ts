import { PDFPage, PDFFont, PDFDocument, rgb } from 'pdf-lib';

type TextStyle = {
    font: PDFFont;
    size: number;
    color: any;
};

type PageContext = {
    page: PDFPage;
    cursorY: number;
};

/**
 * Draws wrapped paragraph with bullets, auto page-break, and returns updated context
 */
export const drawParagraph = (
    doc: PDFDocument,
    ctx: PageContext,
    text: string,
    x: number,
    style: TextStyle,
    maxWidth: number,
    lineHeight: number,
    marginBottom: number = 38 // bottom margin
): [page: PDFPage, trackerY: number] => {
    // Normalize text: trim, unify line breaks, detect bullets
    let normalized = text.trim().replace(/\r\n/g, '\n');

    // Split into paragraphs by newline
    const paragraphs = normalized.split('\n');

    let { page, cursorY } = ctx;

    paragraphs.forEach((para) => {
        const isBullet = para.trim().startsWith('- ');
        let content = isBullet ? para.trim().slice(2) : para.trim();

        const words = content.split(/\s+/);
        let line = '';

        words.forEach((word, idx) => {
            const testLine = line ? line + ' ' + word : word;
            const lineWidth = style.font.widthOfTextAtSize(testLine, style.size);

            if (lineWidth > maxWidth && line !== '') {
                // Draw line
                const lineText = isBullet && line === words[0] ? '\u2022 ' + line : line;
                page.drawText(lineText, {
                    x: isBullet ? x + 12 : x,
                    y: cursorY,
                    size: style.size,
                    font: style.font,
                    color: style.color,
                });

                cursorY -= lineHeight;
                line = word;

                // Page break check
                if (cursorY < marginBottom) {
                    page = doc.addPage();
                    const { height } = page.getSize();
                    cursorY = height - marginBottom;
                }
            } else {
                line = testLine;
            }

            // Flush last word
            if (idx === words.length - 1) {
                const lineText = isBullet ? '• ' + line : line;
                page.drawText(lineText, {
                    x: isBullet ? x + 12 : x,
                    y: cursorY,
                    size: style.size,
                    font: style.font,
                    color: style.color,
                });
                cursorY -= lineHeight;

                // Page break check
                if (cursorY < marginBottom) {
                    page = doc.addPage();
                    const { height } = page.getSize();
                    cursorY = height - marginBottom;
                }
            }
        });

        // Extra gap between paragraphs
        cursorY -= lineHeight / 2;
    });

    return [page, cursorY];
};

export const createSectionHeading = (
    trackerY: number,
    font: PDFFont,
    size: number,
    page: PDFPage,
    topMargin: number,
    width: number,
    leftMargin: number,
    title: string
) => {
    trackerY -= font.heightAtSize(topMargin) + 1.4;

    page.drawText(title, {
        x: leftMargin,
        y: trackerY,
        size: size,
        font: font,
    });

    trackerY -= 6;

    page.drawLine({
        start: {
            x: leftMargin,
            y: trackerY,
        },
        end: {
            x: width - leftMargin,
            y: trackerY,
        },
        thickness: 1,
    });

    trackerY -= font.heightAtSize(size);
    return trackerY;
};

export const formatDate = (date: string | Date) => {
    try {
        let dateArray = new Date(date).toISOString().split('T')[0].split('-');
        let formated = `${dateArray[0]} ${['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].at(Number(dateArray[1]) - 1)}`;

        return formated;
    } catch (error) {
        console.warn('formatDate: ' + error);
        return 'present';
    }
};
