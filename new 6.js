<script>
var isBodyClickedGuided = false;
var isBannerAddedGuided = false;
var intervalIdGuided;
var timeoutIdGuided;

window.isGuidedBannerAdded = false;

function addBannerGuided(selector, featureName, imageURL) {
  var bannerContainer = document.querySelector(selector);

  if (bannerContainer && !isBannerAddedGuided) {
    bannerContainer.innerHTML =
      '<a onclick="navigateTo({featureName:\'' + featureName + '\'})">' +
      '<img id="adobeBannerOfferImage" ' +
      'onclick="myFunctionGuided(\'' + featureName + '\')" ' +
      'data-idp-default="true" src="' + imageURL + '"></a>';

    bannerContainer.style.textAlign =
      selector === "#citAdobeData" ? "center" : "";

    window.offerImpression = {
      featureName: featureName
    };

    if (typeof _satellite !== "undefined" && _satellite.track) {
      _satellite.track("offer_impression", {
        featureName: featureName,
        imageURL: imageURL
      });
    }

    var outerContainer = document.querySelector('[name="containerAdobeBanner"]');
    if (outerContainer) {
      outerContainer.style.display = "block";
    }

    isBannerAddedGuided = true;
    window.isGuidedBannerAdded = true;
    clearInterval(intervalIdGuided);
    clearTimeout(timeoutIdGuided);
  }
}

function myFunctionGuided(featureName) {
  if (!isBodyClickedGuided) {
    if (typeof _satellite !== "undefined" && _satellite.track) {
      _satellite.track("D1_Banner_click", {
        featureName: featureName
      });
    }

    isBodyClickedGuided = true;
  }
}

function getRandomBannerGuided() {
  var banners = [
    {
      featureName: "GUIDED_INVESTING",
      imageURL: "https://cms-assets.cit.com/9j7wv5nnfw5f/1a18eXEK6imZjDXpJMvzV9/267fac545c2e0f7e3cf00f2cc9d533b2/D1-banner_Guided-Investing-online-banking_our-guidance_1.png"
    }
  ];

  var guidedBanner = banners[0];

  addBannerGuided(
    "#adobeBannerOffer",
    guidedBanner.featureName,
    guidedBanner.imageURL
  );

  addBannerGuided(
    "#citAdobeData",
    guidedBanner.featureName,
    guidedBanner.imageURL
  );
}

intervalIdGuided = setInterval(getRandomBannerGuided, 200);

timeoutIdGuided = setTimeout(function () {
  clearInterval(intervalIdGuided);
}, 2000);
</script>