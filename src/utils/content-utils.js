import stringUtils from './string-utils';

// -----------------------------------------------------------------------------
// Normalizes a provided tag label into a tag key value.
// -----------------------------------------------------------------------------
// This function is used during tag creation, normalizing a user-generated
// label into a key value that:
//
// + Strives to identify semantically similar context, thus avoiding
//   redundant clutter and reducing the need for fuzzy matching
//   during post processing.
//
// + Ensures the key is URI-friendly and database-friendly.
//
// + Ensures a number does not enter the database, which would conflict
//   with the capability for dynamically determining if the API is
//   specifying an "id" versus a "key".
// -----------------------------------------------------------------------------
function generateTagKeyFromLabel(label) {
  let key = null;

  if (label && label.length > 0) {
    // -----------------
    // trim and lower...
    // -----------------
    let normalized = label.trim().toLowerCase();

    // --------------------------
    // prepend text for number...
    // --------------------------
    if (!isNaN(normalized)) normalized = `num-${normalized}`;

    // --------------------
    // strip (non-ASCII)...
    // --------------------
    const stripOutNonASCII = new RegExp('[，！？；：（ ）［］【 】。「」﹁﹂“‘’”‧…《》〈〉﹏—～]+', 'g');
    normalized = normalized.replace(stripOutNonASCII, ' ');

    // ------------------------
    // semantic replacements...
    // ------------------------
    // " and " => "-"
    const replaceWithHyphen = new RegExp('\\band\\b');
    normalized = normalized.replace(replaceWithHyphen, '-');
    // "." => " dot "
    normalized = normalized.replace('.', ' dot ');
    // "+" => " plus "
    normalized = normalized.replace(/\++/g, ' plus ');
    // "<" => " less-than "
    normalized = normalized.replace(/<+/g, ' less-than ');
    // ">" => " greater-than "
    normalized = normalized.replace(/>+/g, ' greater-than ');
    // "=" => " equals "
    normalized = normalized.replace(/=+/g, ' equals ');

    // -------------------------------------------
    // format (will handle stripping out ASCII)...
    // -------------------------------------------
    key = stringUtils.toKebabCase(normalized);
  }

  return key;
}

export default {
  generateTagKeyFromLabel,
};
