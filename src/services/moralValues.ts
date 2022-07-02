class MoralValues {
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

  constructor() {}

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
