export interface Data_OthersDetails_Experience {
  id: string;
  title: string;
  description: string;
  src: string;
  start_year: string;
  end_year: string;
}

export interface Data_OthersDetails_Language {
  id: string;
  title: string;
  description: string;
  src: string;
}

export interface Data_OthersDetails_Awards {
  id: string;
  title: string;
  description: string;
  src: string;
  year: string;
}

export interface Data_OthersDetails_Reference {
  id: string;
  title: string;
  description: string;
  email: string;
  names: string;
  phone_number: string;
  company: string;
  position: string;
  relation: string;
  src: string;
  year: string;
}

export interface Data_OthersDetails_Education {
  title: string;
  school_id: string;
  year: string;
  src?: string;
  description?: string;
}

export interface UserInfo {
  first_name: string;
  last_name: string;
  sex: string;
  dob: string;
  fathers_name: string;
  mothers_name: string;
  district: string;
  village: string;
  sector: string;
}

export interface OthersDetails {
  template_id: string;
  id: string;
  title: string;
  data: Array<
    | Data_OthersDetails_Experience
    | Data_OthersDetails_Language
    | Data_OthersDetails_Awards
    | Data_OthersDetails_Reference
    | Data_OthersDetails_Education
  >;
}

// User access
export interface UserAccessItm {
  id: string;
  title: string;
  access: {
    create: boolean;
    delete: boolean;
    update: boolean;
    view: boolean;
  };
}

//Ex: Admin, Evaluator, ...
export interface AccessToUser {
  system_user_access_id: string;
  user_title: string;
  access: Array<UserAccessItm>;
}

export interface UserAttrs {
  n_id: string;
  phone_number: string;
  email: string;
  password: string;
  user_info?: UserInfo;
  details?: Array<OthersDetails>;
  roles_to_users?: Array<{
    system_user_access_id: string;
    status: number;
    access: boolean;
  }>;
}
