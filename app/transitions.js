export default function() {
  this.transition(
    this.outletName('top-route-header'),
    this.use('fade', { duration: 100 })
  );
}
