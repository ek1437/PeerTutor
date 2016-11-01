//var chai = require('chai');
//var chaiHttp = require('chai-http');
//var server = require('../../app');
//var expect = chai.expect;
//
//chai.use(chaiHttp);
//
//describe('Should display list of tutors', () => {
//    
//});
//
//describe('Tutors Controller (Version 2)', () => {
//  it('should list ALL tutors on /tutors GET', (done) => {
//    chai.request(server)
//      .get('/tutors')
//      .end((err,res) => {
//        expect(res.status).to.equal(200);
//        expect(res.text).to.include('Tutors ');
//        done();
//      });
//  });
//  it('should list a SINGLE tutor on /tutors/:title GET', (done) => {
//    chai.request(server)
//      .get('/tutors/blah')
//      .end((err,res) => {
//        expect(res.status).to.equal(200);
//        expect(res).to.be.html;
//        expect(res.text).to.include(' tutor: ');
//        done();
//      });
//  });
//  it('should add a SINGLE tutor on /tutors POST');
//  it('should update a SINGLE tutor on /tutors/:title PUT');
//  it('should delete a SINGLE tutor on /tutors/:title DELETE');
//});