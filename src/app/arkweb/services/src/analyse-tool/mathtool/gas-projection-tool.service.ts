import { Injectable } from '@angular/core';
import { CoreService } from '../../core.service';


@Injectable({
  providedIn: 'root'
})
export class GasProjectionToolService {

  constructor(
    private core: CoreService
    ) {}


    private aEarth = 6378137;
    private bEarth = 6356752.3142;
    private e1 = Math.sqrt(this.aEarth * this.aEarth - this.bEarth * this.bEarth) / this.aEarth;
    private e2 = Math.sqrt(this.aEarth * this.aEarth - this.bEarth * this.bEarth) / this.bEarth;

    public Gauss_to_XY(L, B, middleL2) {
        let t = 0;
        let yita = 0;
        let nn = 0;
        let n = 0;
        const middleL = this.to_Radian(middleL2);
        B = this.to_Radian(B);
        L = this.to_Radian(L);
        const dL = L - middleL;
        const cosB = Math.cos(B);
        n = this.to_N(B);
        nn = n * Math.cos(B);
        t = Math.tan(B);
        yita = this.e2 * cosB;
        const powt2 = Math.pow(t, 2);
        const powt4 = Math.pow(t, 4);
        const powyita2 = Math.pow(yita, 2);
        const powyita4 = Math.pow(yita, 4);
        const powcosB3 = Math.pow(cosB, 3);
        const powcosB5 = Math.pow(cosB, 5);
        // tslint:disable-next-line:max-line-length
        const tY = this.to_Sm(B) + Math.pow(dL, 2) / 2 * nn * cosB * t + Math.pow(dL, 4) / 24 * t * nn * powcosB3 * (5.0 - powt2 + 9.0 * powyita2 + 4 * powyita4) + Math.pow(dL, 6) / 720 * t * nn * powcosB5 * (61.0 - 58.0 * t * t + powt4 + 270 * powyita2 - 330 * t * t * powyita2);
        // tslint:disable-next-line:max-line-length
        const tX = dL * n * cosB + Math.pow(dL, 3) / 6.0 * n * powcosB3 * (1 - t * t + yita * yita) + Math.pow(dL, 5) / 120.0 * n * powcosB5 * (5 - 18 * t * t + powt4 + 14.0 * powyita2 - 58.0 * powyita2 * powt2);
        return new ArkWeb.Cartesian2(tX, tY);
    }
    private to_Radian(degree) {
        return degree * Math.PI / 180.0;
    }
    private to_Sm(B) {
        // tslint:disable-next-line:max-line-length
        const AA = 1 + (this.e1 * this.e1) * 3 / 4 + Math.pow(this.e1, 4.0) * 45 / 64 + Math.pow(this.e1, 6) * 175 / 256 + Math.pow(this.e1, 8) * 11025 / 16384;
        // tslint:disable-next-line:max-line-length
        const BB = Math.pow(this.e1, 2) * 3 / 4 + Math.pow(this.e1, 4) * 15 / 16 + Math.pow(this.e1, 6) * 525 / 512 + Math.pow(this.e1, 8) * 2205 / 2048;
        const CC = Math.pow(this.e1, 4) * 15 / 64 + Math.pow(this.e1, 6) * 105 / 256 + Math.pow(this.e1, 8) * 2205 / 4096;
        const DD = Math.pow(this.e1, 6) * 35 / 512 + Math.pow(this.e1, 8) * 315 / 2048;
        // tslint:disable-next-line:max-line-length
        const EE = Math.pow(this.e1, 8) * 315 / 16384;
        // tslint:disable-next-line:max-line-length
        return this.aEarth * (1 - this.e1 * this.e1) * (AA * B - BB / 2 * Math.sin(2 * B) + CC / 4 * Math.sin(4 * B) - DD / 6 * Math.sin(6 * B) + EE / 8 * Math.sin(8 * B));
    }
    private to_N(B) {
        const ans = (this.aEarth / Math.sqrt(1.00 - this.e1 * this.e1 * Math.sin(B) * Math.sin(B)));
        return ans ;
    }

    private Sm_to_B(Sm) {
        // tslint:disable-next-line:max-line-length
        const AA = 1 + (this.e1 * this.e1) * 3 / 4 + Math.pow(this.e1, 4.0) * 45 / 64 + Math.pow(this.e1, 6) * 175 / 256 + Math.pow(this.e1, 8) * 11025 / 16384;
        // tslint:disable-next-line:max-line-length
        const BB = Math.pow(this.e1, 2) * 3 / 4 + Math.pow(this.e1, 4) * 15 / 16 + Math.pow(this.e1, 6) * 525 / 512 + Math.pow(this.e1, 8) * 2205 / 2048;
        const CC = Math.pow(this.e1, 4) * 15 / 64 + Math.pow(this.e1, 6) * 105 / 256 + Math.pow(this.e1, 8) * 2205 / 4096;

        const DD = Math.pow(this.e1, 6) * 35 / 512 + Math.pow(this.e1, 8) * 315 / 2048;
        const EE = Math.pow(this.e1, 8) * 315 / 16384;
        const fai = Sm / (this.aEarth * (1 - this.e1 * this.e1) * AA);
        const A2 = BB / AA / 2;
        const A4 = -CC / AA / 4;
        const A6 = DD / AA / 6;
        const A8 = -EE / AA / 8;
        // tslint:disable-next-line:max-line-length
        const B2 = A2 - A2 * A4 - A4 * A6 - 0.5 * Math.pow(A2, 3) - A2 * Math.pow(A4, 2) + 0.5 * Math.pow(A2, 2) * A6 - 18.3 * Math.pow(A2, 3) * A4;
        const B4 = A4 + Math.pow(A2, 2) - A2 * A6 * 2 - 4 * A2 * A2 * A4 - 1.3 * Math.pow(A2, 4);
        // tslint:disable-next-line:max-line-length
        const B6 = A6 + 3 * A2 * A4 - 3 * A2 * A8 + 1.5 * Math.pow(A2, 3) - 4.5 * A2 * A4 * A4 - 9 * A2 * A2 * A6 - 12.5 * Math.pow(A2, 3) * A4;
        const B8 = A8 + 2 * A4 * A4 + 4 * A2 * A6 + 8 * A2 * A2 * A4 + 2.7 * Math.pow(A2, 4);
        const B = fai + B2 * Math.sin(2 * fai) + B4 * Math.sin(4 * fai) + B6 * Math.sin(6 * fai) + B8 * Math.sin(8 * fai);
        return B;
    }
    private Gauss_to_BL(x, y, mFL0) {
        const bf = this.Sm_to_B(y);
        const n = this.to_N(bf);
        const t = Math.tan(bf);
        const yita = this.e2 * Math.cos(bf);
        // tslint:disable-next-line:max-line-length
        const B = bf + t * (-1 - yita * yita) * x * x / (2.0 * Math.pow(n, 2)) + t * (5 + 3 * Math.pow(t, 2) + 6.0 * Math.pow(yita, 2) - 6.0 * Math.pow(t, 2) * Math.pow(yita, 2) - 3.0 * Math.pow(yita, 4) - 9.0 * Math.pow(t, 2) * Math.pow(yita, 4)) * Math.pow(x, 4) / (24.0 * Math.pow(n, 4)) + t * (-61.0 - 90.0 * Math.pow(t, 2) - 45.0 * Math.pow(t, 4) - 107 * Math.pow(yita, 2) + 162 * Math.pow(t, 2) * Math.pow(yita, 2) + 45 * Math.pow(t, 4) * Math.pow(yita, 2)) * Math.pow(x, 6) / (720.0 * Math.pow(n, 6));
        // tslint:disable-next-line:max-line-length
        const L = x / (n * Math.cos(bf)) + (-1 - 2 * Math.pow(t, 2) - Math.pow(yita, 2)) * Math.pow(x, 3) / (6 * Math.pow(n, 3) * Math.cos(bf)) + (5 + 28 * Math.pow(t, 2) + 24 * Math.pow(t, 4) + 6 * Math.pow(yita, 2) + 8 * Math.pow(t, 2) * Math.pow(yita, 2)) * Math.pow(x, 5) / (120 * Math.pow(n, 5) * Math.cos(bf));
        // return new ArkWeb.s(L + mFL0, B / Math.PI * 180) ;
    }
    private to_Degree(radian) {
         return radian / Math.PI * 180.0 ;
    }


}
