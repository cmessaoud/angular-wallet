describe("Unit Testing OperationsService", function() {

  beforeEach(module('WalletApp'));

  var OperationsService;

  beforeEach(inject(function(_OperationsService_){
    OperationsService = _OperationsService_;
  }));

  describe('addOperation', function () {
    it('should execute a callback with error if amount null', function () {
      OperationsService.addOperation(null, function (err, operation) {
        expect(err).toBeDefined();
        expect(operation).not.toBeDefined();
        expect(err.message).toEqual('amount must be a number');
      });
    });

    it('should execute a callback with error if amount is undefined', function () {
      OperationsService.addOperation(undefined, function (err, operation) {
        expect(err).toBeDefined();
        expect(operation).not.toBeDefined();
        expect(err.message).toEqual('amount must be a number');
      });
    });

    it('should execute a callback with error if amount is NaN', function () {
      OperationsService.addOperation('NotANumber', function (err, operation) {
        expect(err).toBeDefined();
        expect(operation).not.toBeDefined();
        expect(err.message).toEqual('amount must be a number');
      });
    });

    it('should execute a callback with error if amount is 0', function () {
      OperationsService.addOperation(0, function (err, operation) {
        expect(err).toBeDefined();
        expect(operation).not.toBeDefined();
        expect(err.message).toEqual('amount must be different from zero');
      });
    });

    it('should execute a callback without error if amount is positive', function () {
      OperationsService.addOperation(3, function (err, operation) {
        expect(err).toBeNull();
        expect(operation).toBeDefined();
      });
    });

    it('should execute a callback without error if amount is negative and total resulting amount is positive', function () {
      OperationsService.addOperation(-1, function (err, operation) {
        expect(err).toBeNull();
        expect(operation).toBeDefined();
      });
    });

    it('should execute a callback with error if total resulting amount is negative', function () {
      OperationsService.addOperation(-3, function (err, operation) {
        expect(err).toBeDefined();
        expect(operation).not.toBeDefined();
        expect(err.message).toEqual('the total after operation must remain positive');
      });
    });
  });

  describe('resetOperations', function () {
    it('should clean the operations', function () {
      OperationsService.resetOperations();
      var operations = OperationsService.getOperations();
      expect(operations.length).toEqual(0);
    });
  });


});
