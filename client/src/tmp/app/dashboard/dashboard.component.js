"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var party_service_1 = require('../services/party.service');
var DashboardComponent = (function () {
    function DashboardComponent(_partyService) {
        this._partyService = _partyService;
    }
    DashboardComponent.prototype.refreshRequests = function () {
        var _this = this;
        this._partyService.getRequests().subscribe(function (reqs) { return _this.requests = reqs; });
    };
    DashboardComponent.prototype.approveSong = function (song) {
        var _this = this;
        this._partyService.approve(song).subscribe(function (res) { return _this.refreshRequests(); });
    };
    DashboardComponent.prototype.dismissSong = function (song) {
        var _this = this;
        this._partyService.dismiss(song).subscribe(function (res) { return _this.refreshRequests(); });
    };
    DashboardComponent.prototype.ngOnInit = function () {
        var _this = this;
        // Check party status
        this._partyService.getStatus().subscribe(function (res) {
            if (!res.party) {
                _this._partyService.create().subscribe();
            }
            // TODO Pop some toast like "Loaded existing party"
        });
        this.shareUrl = window.location.host + "/party/" + this._partyService.getUid();
    };
    DashboardComponent = __decorate([
        core_1.Component({
            selector: 'dashboard',
            templateUrl: 'app/dashboard/dashboard.component.html',
        }), 
        __metadata('design:paramtypes', [party_service_1.PartyService])
    ], DashboardComponent);
    return DashboardComponent;
}());
exports.DashboardComponent = DashboardComponent;

//# sourceMappingURL=dashboard.component.js.map
