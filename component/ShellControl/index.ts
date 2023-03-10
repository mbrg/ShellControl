import { IInputs, IOutputs } from "./generated/ManifestTypes";

export class ShellControl implements ComponentFramework.StandardControl<IInputs, IOutputs> {
	// PCF framework delegate which will be assigned to this object which would be called whenever any update happens. 
	private _notifyOutputChanged: () => void;

	// label element created as part of this control
	private console: HTMLInputElement;
	private consoleOut: HTMLInputElement;

	// button element created as part of this control
	private button: HTMLButtonElement;

	// Reference to the control container HTMLDivElement
	// This element contains all elements of our custom control example
	private _container: HTMLDivElement;

	private _context: ComponentFramework.Context<IInputs>;

	/**
	 * Empty constructor.
	 */
	constructor() {
		// no-op: method not leveraged by this example custom control
	}

	/**
	 * Used to initialize the control instance. Controls can kick off remote server calls and other initialization actions here.
	 * Data-set values are not initialized here, use updateView.
	 * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to property names defined in the manifest, as well as utility functions.
	 * @param notifyOutputChanged A callback method to alert the framework that the control has new outputs ready to be retrieved asynchronously.
	 * @param state A piece of data that persists in one session for a single user. Can be set at any point in a controls life cycle by calling 'setControlState' in the Mode interface.
	 * @param container If a control is marked control-type='standard', it will receive an empty div element within which it can render its content.
	 */
	public init(context: ComponentFramework.Context<IInputs>, notifyOutputChanged: () => void, state: ComponentFramework.Dictionary, container: HTMLDivElement): void {
		this.console = document.createElement("input");
		this.console.setAttribute("type", "console");
		this.consoleOut = document.createElement("input");
		this.consoleOut.setAttribute("type", "consoleOut");

		//Create a button to increment the value by 1.
		this.button = document.createElement("button");

		// Get the localized string from localized string 
		this.button.innerHTML = "execute"

		this._notifyOutputChanged = notifyOutputChanged;
		this.button.addEventListener("click", this.onButtonClick.bind(this));

		// Adding the label and button created to the container DIV.
		this._container = document.createElement("div");
		this._container.appendChild(this.console);
		this._container.appendChild(this.consoleOut);
		this._container.appendChild(this.button);
		container.appendChild(this._container);

		this._context = context;
	}

	/**
	 * Button Event handler for the button created as part of this control
	 * @param event
	 */
	private onButtonClick(event: Event): void {
		this.consoleOut.value = eval(this.console.value);
		this._notifyOutputChanged();
	}

	/**
	 * Called when any value in the property bag has changed. This includes field values, data-sets, global values such as container height and width, offline status, control metadata values such as label, visible, etc.
	 * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to names defined in the manifest, as well as utility functions
	 */
	public updateView(context: ComponentFramework.Context<IInputs>): void {
		// This method would rerender the control with the updated values after we call NotifyOutputChanged
		//set the value of the field control to the raw value from the configured field
		this._context = context;
	}

	/** 
	 * It is called by the framework prior to a control receiving new data. 
	 * @returns an object based on nomenclature defined in manifest, expecting object[s] for property marked as "bound" or "output"
	 */
	public getOutputs(): IOutputs {
		// custom code goes here - remove the line below and return the correct output
		const result: IOutputs = {
		};
		return result;
	}

	/** 
	 * Called when the control is to be removed from the DOM tree. Controls should use this call for cleanup.
	 * i.e. cancelling any pending remote calls, removing listeners, etc.
	 */
	public destroy(): void {
		// no-op: method not leveraged by this example custom control
	}
}