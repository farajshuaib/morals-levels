interface props {
  id?: String;
  valueName: String;
  ExaggerateValueName: String;
  DerelictionValueName: String;
  StandardValue: String;
  SourcedValue: String;
  LevelValue: String;
  LadderValue: String;
  SchoolValue: String;
  TypedValue: String;
  ActivationValue: String;
}

const localStorageVals = localStorage.getItem("values");
class MoralValues {
  private id: String = "";
  private valueName: String = "";
  private ExaggerateValueName: String = "";
  private DerelictionValueName: String = "";
  private StandardValue: String = "";
  private SourcedValue: String = "";
  private LevelValue: String = "";
  private LadderValue: String = "";
  private SchoolValue: String = "";
  private TypedValue: String = "";
  private ActivationValue: String = "";

  private values: Array<this> = localStorageVals
    ? JSON.parse(localStorageVals)
    : [];

  constructor({
    valueName,
    ExaggerateValueName,
    DerelictionValueName,
    StandardValue,
    SourcedValue,
    LevelValue,
    LadderValue,
    SchoolValue,
    TypedValue,
    ActivationValue,
  }: props) {
    this.setId(new Date().getTime().toString());
    this.setValueName(valueName);
    this.setExaggerateValueName(ExaggerateValueName);
    this.setDerelictionValueName(DerelictionValueName);
    this.setStandardValue(StandardValue);
    this.setSourcedValue(SourcedValue);
    this.setLevelValue(LevelValue);
    this.setLadderValue(LadderValue);
    this.setSchoolValue(SchoolValue);
    this.setTypedValue(TypedValue);
    this.setActivauionValue(ActivationValue);

    this.saveValues({
      id: this.id,
      valueName,
      ExaggerateValueName,
      DerelictionValueName,
      StandardValue,
      SourcedValue,
      LevelValue,
      LadderValue,
      SchoolValue,
      TypedValue,
      ActivationValue,
    });
  }

  private saveValues(values: props) {
    const prevValues = localStorageVals ? JSON.parse(localStorageVals) : [];
    const newValues = [...prevValues, values];
    this.values = newValues;
    localStorage.setItem("values", JSON.stringify(newValues));
  }

  public getValues(): Array<this> {
    return this.values;
  }

  public setId(id: String): void {
    this.id = id;
  }

  public getId(): String {
    return this.id;
  }

  public setValueName(valueName: String): void {
    this.valueName = valueName;
  }

  public getValueName(): String {
    return this.valueName;
  }

  public setExaggerateValueName(ExaggerateValueName: String): void {
    this.ExaggerateValueName = ExaggerateValueName;
  }

  public getExaggerateValueName(): String {
    return this.ExaggerateValueName;
  }

  public setDerelictionValueName(DerelictionValueName: String): void {
    this.DerelictionValueName = DerelictionValueName;
  }

  public grtDerelictionValueName(): String {
    return this.DerelictionValueName;
  }

  public setStandardValue(StandardValue: String): void {
    this.StandardValue = StandardValue;
  }

  public getStandardValue(): String {
    return this.StandardValue;
  }

  public setSourcedValue(SourcedValue: String): void {
    this.SourcedValue = SourcedValue;
  }

  public getSourceValue(): String {
    return this.SourcedValue;
  }

  public setLevelValue(LevelValue: String): void {
    this.LevelValue = LevelValue;
  }

  public getLevelValue(): String {
    return this.LevelValue;
  }

  public setLadderValue(LadderValue: String) {
    this.LadderValue = LadderValue;
  }

  public getLadderValue(): String {
    return this.LadderValue;
  }

  public setSchoolValue(SchoolValue: String): void {
    this.SchoolValue = SchoolValue;
  }

  public getSchoolValue(): String {
    return this.SchoolValue;
  }

  public setTypedValue(TypedValue: String): void {
    this.TypedValue = TypedValue;
  }

  public getTypeValue(): String {
    return this.TypedValue;
  }

  public setActivauionValue(ActivationValue: String): void {
    this.ActivationValue = ActivationValue;
  }

  public getActivationValue(): String {
    return this.ActivationValue;
  }
}

export default MoralValues;
