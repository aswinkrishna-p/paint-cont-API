
interface Address {
    country?: string;
    state?: string;
    city?: string;
  }

export interface Ipainter {
    _id?:string,
    username: string;
    email: string;
    password: string;
    isBlocked?: boolean;
    profile?: string;
    phone?: number;
    address?: Address;
    age?:number;
    experience?: string;
    specialised?: string[];
    description?: string;
    experienceYears?:number
    aboutMe?: string;
    followers?: string[];
    premium?: boolean;
    premiumEndingDate?: Date;
    isValid?: boolean;
    location?:string
}