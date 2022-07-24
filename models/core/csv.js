function splitLine(line) {
    return line.split(',')
}

function getProcessedLineValues(line) {
    return splitLine(line).map(removeQuotations)
}

function removeQuotations(line) {
    return line.replace(/(\")|(\')/g, '');
}


function getValueIndex(columnType, columnsHeading) {
    const headingArray = getProcessedLineValues(columnsHeading);

    return headingArray.indexOf(columnType);
}

function getColumnFromLine(line, columnType, columnsHeading) {
    const valueIndex = getValueIndex(columnType, columnsHeading);
    const lineValues = getProcessedLineValues(line);

    if (valueIndex === -1) {
        console.log(`There is no columnType ${columnType} in file columnsHeading: ${columnsHeading}`);
        return;
    }

    return lineValues[valueIndex];
}

function splitData(lines) {
    const heading = lines[0];
    const data = lines.slice(1);

    return { heading, data };
}

function prepareValueForOutput(value) {
    if (typeof value !== 'number') {
        return `"${value}"`;
    }

    return value;
}

function buildOutputLine(values) {
    return values.map(prepareValueForOutput).join(',');
}

function buildHeading(columnsObj) {
    return buildOutputLine([
        Object.values(columnsObj)
    ]);
}

module.exports = {
    getColumnFromLine,
    getValueIndex,
    splitLine,
    splitData,
    prepareValueForOutput,
    buildOutputLine,
    buildHeading
}
