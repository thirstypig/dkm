// Review gate + feedback overlay for the pre-launch draft (public/review/).
//
// NOT SECURITY: the hash ships in every page and the repo is public. It keeps
// casual visitors out while Donyell reviews. Remove at launch, together with
// the noindex tag, robots.txt Disallow, and the dkm-review Worker.
export const review = {
  // sha256("dkm-preview:" + password)
  hash: 'af802ebcd73f94519ea4d7a973e4f453b5b23d8535fd2e72cac2daee7d056246',
  api: 'https://dkm-review.jimmyc316.workers.dev',
};
