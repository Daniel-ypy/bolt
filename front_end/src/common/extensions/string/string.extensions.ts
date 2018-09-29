interface String {
    replaceAll(match: string, replacement: string);

    trim();

    toNumber();

    toDate();

    isDecimal(): boolean;

    startsWith(search: string): boolean;
}

String.prototype.replaceAll = function (match: string, replacement: string) {
    return this.replace(new RegExp(match, 'g'), replacement);
};

String.prototype.trim = function () {
    return this.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
};

String.prototype.toNumber = function () {
    let numberVal = parseInt(this);

    return isNaN(numberVal) ? 0 : numberVal;
};

String.prototype.toDate = function () {
    return new Date(this);
};

String.prototype.isDecimal = function () {
    return (this.indexOf(',') !== -1) || (this.indexOf('.') !== -1);
};

String.prototype.startsWith = function(search) {
    return !this.indexOf(search);
};
