/*
global
BASE64_ALPHABET_HI_4,
BASE64_ALPHABET_LO_4,
CHARACTERS,
CODERS,
COMPLEX,
CONSTANTS,
CREATE_PARSE_INT_ARG,
DEBUG,
FROM_CHAR_CODE,
FROM_CHAR_CODE_CALLBACK_FORMATTER,
MAPPER_FORMATTER,
OPTIMAL_B,
OPTIMAL_RETURN_STRING,
Empty,
Encoder,
Feature,
JScrewIt,
ScrewBuffer,
Solution,
array_isArray,
assignNoEnum,
createBridgeSolution,
createClusteringPlan,
createFigurator,
createParseIntArgByReduce,
createParseIntArgByReduceArrow,
createParseIntArgDefault,
define,
esToString,
featureFromMask,
fromCharCodeCallbackFormatterArrow1,
fromCharCodeCallbackFormatterArrow2,
fromCharCodeCallbackFormatterArrowStatus,
fromCharCodeCallbackFormatterDefault1,
fromCharCodeCallbackFormatterDefault2,
fromCharCodeCallbackFormatterStatus,
getComplexOptimizer,
getToStringOptimizer,
getValidFeatureMask,
isMaskCompatible,
json_stringify,
mapperFormatterDblArrow,
mapperFormatterDefault,
maskAnd,
maskIncludes,
maskIsEmpty,
maskNew,
maskUnion,
object_create,
object_freeze,
object_keys,
optimizeSolutions,
setUp,
trimJS,
*/

// istanbul ignore else
if (typeof DEBUG === 'undefined' || /* istanbul ignore next */ DEBUG)
{
    (function ()
    {
        function clone(obj)
        {
            if (typeof obj === 'object')
            {
                var target = { };
                var names = object_keys(obj);
                names.forEach
                (
                    function (name)
                    {
                        var value = clone(obj[name]);
                        target[name] = value;
                    }
                );
                return target;
            }
            return obj;
        }

        function cloneEntries(inputEntries)
        {
            var outputEntries;
            if (inputEntries)
            {
                var singleton = !array_isArray(inputEntries);
                if (singleton)
                    outputEntries = [createEntryClone(inputEntries, EMPTY_MASK)];
                else
                {
                    outputEntries =
                    inputEntries.map
                    (
                        function (entry)
                        {
                            entry = cloneEntry(entry);
                            return entry;
                        }
                    );
                }
                outputEntries.singleton = singleton;
            }
            return outputEntries;
        }

        function cloneEntry(entry)
        {
            entry = createEntryClone(entry.definition, entry.mask);
            return entry;
        }

        function createEncoder(features)
        {
            var mask = getValidFeatureMask(features);
            var encoder = new Encoder(mask);
            encoder.codingLog = [];
            return encoder;
        }

        function createEntryClone(definition, mask)
        {
            definition = clone(definition);
            mask = mask.slice();
            var entry = { definition: definition, mask: mask };
            return entry;
        }

        function createFeatureFromMask(mask)
        {
            var featureObj = isMaskCompatible(mask) ? featureFromMask(mask) : null;
            return featureObj;
        }

        function createScrewBuffer(bond, forceString, groupThreshold, optimizerList)
        {
            var buffer = new ScrewBuffer(bond, forceString, groupThreshold, optimizerList);
            return buffer;
        }

        function defineConstant(encoder, constant, definition)
        {
            constant += '';
            if (!/^[$A-Z_a-z][$\w]*$/.test(constant))
                throw new SyntaxError('Invalid identifier ' + json_stringify(constant));
            if (!encoder.hasOwnProperty('constantDefinitions'))
                encoder.constantDefinitions = object_create(CONSTANTS);
            var entries = [define(esToString(definition))];
            encoder.constantDefinitions[constant] = entries;
        }

        function getCharacterEntries(char)
        {
            var entries = cloneEntries(CHARACTERS[char]);
            return entries;
        }

        function getCoders()
        {
            return CODERS;
        }

        function getComplexEntry(complex)
        {
            var entries = cloneEntry(COMPLEX[complex]);
            return entries;
        }

        function getComplexNames()
        {
            var names = object_keys(COMPLEX).sort();
            return names;
        }

        function getConstantEntries(constant)
        {
            var entries = cloneEntries(CONSTANTS[constant]);
            return entries;
        }

        function getEntries(name)
        {
            var entries = cloneEntries(ENTRIES[name]);
            return entries;
        }

        var ARROW           = Feature.ARROW;
        var FROM_CODE_POINT = Feature.FROM_CODE_POINT;
        var STATUS          = Feature.STATUS;

        var EMPTY_MASK = maskNew();

        // Exported entries
        var ENTRIES = new Empty();
        ENTRIES['BASE64_ALPHABET_HI_4:0']           = BASE64_ALPHABET_HI_4[0];
        ENTRIES['BASE64_ALPHABET_HI_4:4']           = BASE64_ALPHABET_HI_4[4];
        ENTRIES['BASE64_ALPHABET_HI_4:5']           = BASE64_ALPHABET_HI_4[5];
        ENTRIES['BASE64_ALPHABET_LO_4:1']           = BASE64_ALPHABET_LO_4[1];
        ENTRIES['BASE64_ALPHABET_LO_4:3']           = BASE64_ALPHABET_LO_4[3];
        ENTRIES.CREATE_PARSE_INT_ARG                = CREATE_PARSE_INT_ARG;
        ENTRIES['CREATE_PARSE_INT_ARG:available'] =
        [
            define(createParseIntArgDefault),
            define(createParseIntArgByReduce),
            define(createParseIntArgByReduceArrow, ARROW),
        ];
        ENTRIES.FROM_CHAR_CODE                      = FROM_CHAR_CODE;
        ENTRIES['FROM_CHAR_CODE:available'] =
        [
            define('fromCharCode'),
            define('fromCodePoint', FROM_CODE_POINT),
        ];
        ENTRIES.FROM_CHAR_CODE_CALLBACK_FORMATTER   = FROM_CHAR_CODE_CALLBACK_FORMATTER;
        ENTRIES['FROM_CHAR_CODE_CALLBACK_FORMATTER:available'] =
        [
            define(fromCharCodeCallbackFormatterDefault1),
            define(fromCharCodeCallbackFormatterDefault2),
            define(fromCharCodeCallbackFormatterStatus, STATUS),
            define(fromCharCodeCallbackFormatterArrow1, ARROW),
            define(fromCharCodeCallbackFormatterArrow2, ARROW),
            define(fromCharCodeCallbackFormatterArrowStatus, ARROW, STATUS),
        ];
        ENTRIES.MAPPER_FORMATTER                    = MAPPER_FORMATTER;
        ENTRIES['MAPPER_FORMATTER:available'] =
        [
            define(mapperFormatterDefault),
            define(mapperFormatterDblArrow, ARROW),
        ];
        ENTRIES.OPTIMAL_B                           = OPTIMAL_B;
        ENTRIES.OPTIMAL_RETURN_STRING               = OPTIMAL_RETURN_STRING;

        var debug =
        assignNoEnum
        (
            { },
            {
                Solution:               Solution,
                createBridgeSolution:   createBridgeSolution,
                createClusteringPlan:   createClusteringPlan,
                createEncoder:          createEncoder,
                createFeatureFromMask:  createFeatureFromMask,
                createFigurator:        createFigurator,
                createScrewBuffer:      createScrewBuffer,
                defineConstant:         defineConstant,
                getCharacterEntries:    getCharacterEntries,
                getCoders:              getCoders,
                getComplexEntry:        getComplexEntry,
                getComplexOptimizer:    getComplexOptimizer,
                getComplexNames:        getComplexNames,
                getConstantEntries:     getConstantEntries,
                getEntries:             getEntries,
                getToStringOptimizer:   getToStringOptimizer,
                maskAnd:                maskAnd,
                maskIncludes:           maskIncludes,
                maskIsEmpty:            maskIsEmpty,
                maskNew:                maskNew,
                maskUnion:              maskUnion,
                optimizeSolutions:      optimizeSolutions,
                setUp:                  setUp,
                trimJS:                 trimJS,
            }
        );
        assignNoEnum(JScrewIt, { debug: debug });
    }
    )();
}
