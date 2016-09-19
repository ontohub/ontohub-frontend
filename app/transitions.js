export default function() {
  this.transition(
    this.outletName('top-route-header'),
    this.use('crossFade', { duration: 0 })
  );
}
