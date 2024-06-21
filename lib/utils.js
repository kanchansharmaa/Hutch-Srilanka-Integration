function getBundleIdByName(bundleName) {
  let bundleId;

  if (bundleName === "Fitofyy") {
    bundleId = process.env.Bundle_ID_Fitofyy;
  } else if (bundleName === "Kidszonepro") {
    bundleId = process.env.Bundle_ID_Kidszonepro;
  } else if (bundleName === "Gameofyy") {
    bundleId = process.env.Bundle_ID_Gameofyy;
  } else {
    bundleId = null; // Handle if the bundle name is not found
  }

  return bundleId;
}

function getBundleNameByID(bundleid) {
  let bundlename;

  if (bundleid =="809") {
    bundlename = "Gameofyy";
  } 
  else if (bundleid == "807") {
    bundlename = "Kidszonepro";
  } 
  else if (bundleid == "805") {
    bundlename = "Fitofyy";
  } else {
    bundlename = null; // Handle if the bundle name is not found
  }

  return bundlename;
}

module.exports = { getBundleIdByName ,getBundleNameByID};
